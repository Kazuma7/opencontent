import {
  Engine,
  PreparedTransaction,
  ThirdwebClient,
  getContract,
  prepareContractCall,
} from "thirdweb";
import {
  Address,
  Hex,
  Chain,
  PublicClient,
  verifyTypedData,
  parseSignature,
  encodeFunctionData,
  erc20Abi,
} from "viem";
import { sepolia } from "thirdweb/chains";
import { ERC20_PERMIT_ABI } from "./abis/erc20-permit";
import { ADMIN_MULTICALL_ABI } from "./abis/admin-multicall";
import { findPublicClient, findThridWebChainById, wagmiConfig } from "./wagmi";

export type SignedGassLessTransfer = {
  chainId: number;
  owner: Address;
  deadlineSec: number;
  tokenAddress: Address;
  transfers: { to: Address; value: string }[];
  idempotencyKey: string;
  signature: Hex;
};

export const ADMIN_MULTICALL_ADDRESSES: Record<number, Address> = {
  11155111: "0x26216a4199B842033988532280d3E893e0196856",
};

export const fetchPermitMetadata = async (
  publicClient: PublicClient,
  tokenAddress: Address,
  owner: Address
) => {
  const [name, nonce] = await Promise.all([
    publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_PERMIT_ABI,
      functionName: "name",
    }),
    publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_PERMIT_ABI,
      functionName: "nonces",
      args: [owner],
    }),
  ]);
  return { name, nonce };
};

export const getPermitSignMessage = (params: {
  name: string;
  chainId: number;
  tokenAddress: Address;
  owner: Address;
  nonce: bigint;
  totalValue: bigint;
  deadlineSec: number;
}) => {
  const { name, chainId, tokenAddress, owner, nonce, totalValue, deadlineSec } =
    params;

  const domain = {
    name,
    version: "1",
    chainId: BigInt(chainId),
    verifyingContract: tokenAddress,
  } as const;

  const types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  } as const;

  const message = {
    owner,
    spender: ADMIN_MULTICALL_ADDRESSES[chainId],
    value: totalValue,
    nonce,
    deadline: BigInt(deadlineSec),
  } as const;

  return {
    address: owner,
    domain,
    types,
    primaryType: "Permit",
    message,
  } as const;
};

export const createGasslessTransferService = (params: {
  thirdwebClient: ThirdwebClient;
  serverWalletAddress: Address;
}) => {
  const { thirdwebClient, serverWalletAddress } = params;

  const issueGasslessTransfer = async (
    signedTransfer: SignedGassLessTransfer
  ) => {
    try {
      const {
        chainId,
        tokenAddress,
        owner,
        transfers,
        deadlineSec,
        signature,
        idempotencyKey,
      } = signedTransfer;

      const chain = findThridWebChainById(chainId);
      const publicClient = findPublicClient(chainId);
      const multicallAddress = ADMIN_MULTICALL_ADDRESSES[chainId];

      if (!multicallAddress || !chain || !publicClient) {
        return { success: false, message: "invalid_chainid" } as const;
      }

      const serverWallet = Engine.serverWallet({
        client: thirdwebClient,
        address: serverWalletAddress,
        executionOptions: {
          type: "auto",
          idempotencyKey,
          from: serverWalletAddress,
        } as { type: "auto"; from: Address },
      });

      const totalValue = transfers.reduce(
        (total, transfer) => total + BigInt(transfer.value),
        BigInt(0)
      );

      const { name, nonce } = await fetchPermitMetadata(
        publicClient,
        tokenAddress,
        owner
      );

      const signParams = getPermitSignMessage({
        name,
        chainId,
        tokenAddress,
        owner,
        nonce,
        totalValue,
        deadlineSec,
      });

      const isValidSignature = await verifyTypedData({
        ...signParams,
        signature,
      });
      if (!isValidSignature) {
        return {
          success: false,
          message: "invalid_signature_or_nonce",
        } as const;
      }

      const { r, s, yParity } = parseSignature(signature);
      const v = Number(yParity) + 27;

      const permitCalldata = encodeFunctionData({
        abi: ERC20_PERMIT_ABI,
        functionName: "permit",
        args: [
          owner,
          multicallAddress,
          totalValue,
          BigInt(deadlineSec),
          v,
          r,
          s,
        ],
      });

      const transferCalldataList = transfers.map(({ to, value }) =>
        encodeFunctionData({
          abi: erc20Abi,
          functionName: "transferFrom",
          args: [owner, to, BigInt(value)],
        })
      );

      const contract = getContract({
        client: thirdwebClient,
        chain,
        address: ADMIN_MULTICALL_ADDRESSES[chainId],
        abi: ADMIN_MULTICALL_ABI,
      });

      // const transaction = prepareContractCall({
      //   contract,
      //   method: "aggregate",
      //   params: [
      //     [
      //       { target: tokenAddress, callData: permitCalldata },
      //       ...transferCalldataList.map((callData) => ({
      //         target: tokenAddress,
      //         callData,
      //       })),
      //     ],
      //   ],
      // }) as PreparedTransaction;

      console.log([
        owner,
        multicallAddress,
        totalValue,
        BigInt(deadlineSec),
        v,
        r,
        s,
      ]);
      const transaction = prepareContractCall({
        contract: getContract({
          client: thirdwebClient,
          chain,
          address: tokenAddress,
          abi: ERC20_PERMIT_ABI,
        }),
        method: "permit",
        params: [
          owner,
          multicallAddress,
          totalValue,
          BigInt(deadlineSec),
          v,
          r,
          s,
        ],
      }) as PreparedTransaction;

      const { transactionId } = await serverWallet.enqueueTransaction({
        transaction,
      });

      return { transferId: transactionId };
    } catch (e) {
      console.error("issueGasslessTransfer: Failed issue transfer", e);
      return { success: false, message: "unhandled_error" } as const;
    }
  };

  return { issueGasslessTransfer };
};
