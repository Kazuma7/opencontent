import { Address } from "viem";
import { usePublicClient, useSignTypedData } from "wagmi";
import {
  fetchPermitMetadata,
  getPermitSignMessage,
  SignedGassLessTransfer,
} from "@/lib/gassless-transfer";

export type SignGassLessTransferParams = {
  owner: Address;
  chainId: number;
  deadline?: Date; // default: 1 hour
  tokenAddress: Address;
  transfers: { to: Address; value: bigint }[];
  idempotencyKey?: string;
};

const ONE_HOUR_MILSEC = 60 * 60 * 1000;

export const useSignGassLessTransfer = () => {
  const publicClient = usePublicClient();
  const { signTypedDataAsync } = useSignTypedData();

  const signGassLessTransfer = async (
    params: SignGassLessTransferParams
  ): Promise<SignedGassLessTransfer> => {
    const {
      owner,
      chainId,
      deadline,
      tokenAddress,
      transfers,
      idempotencyKey,
    } = params;

    const totalValue = transfers.reduce(
      (total, transfer) => total + transfer.value,
      BigInt(0)
    );

    const deadlineMilSec = deadline?.getTime() ?? Date.now() + ONE_HOUR_MILSEC;
    const deadlineSec = Math.floor(deadlineMilSec / 1000);

    const { name, nonce } = await fetchPermitMetadata(
      publicClient,
      tokenAddress,
      owner
    );
    console.log("Metadata", { name, nonce });

    const signParams = getPermitSignMessage({
      name,
      chainId,
      tokenAddress,
      owner,
      nonce,
      totalValue,
      deadlineSec,
    });
    console.log("Full sign params", signParams);

    const signature = await signTypedDataAsync(signParams);

    return {
      chainId,
      owner,
      deadlineSec: Number(deadlineSec),
      tokenAddress,
      transfers: transfers.map(({ to, value }) => ({
        to,
        value: value.toString(),
      })),
      idempotencyKey: idempotencyKey ?? crypto.randomUUID(),
      signature,
    };
  };

  return { signGassLessTransfer };
};
