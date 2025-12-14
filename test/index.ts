// permit-flow.ts
import "dotenv/config";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  parseSignature,
  parseUnits,
} from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const PRIVATE_KEY = process.env.PRIVATE_KEY! as `0x${string}`;
const TOKEN_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const RECIPIENT = "0x17899fc47d9bf0fb7e3fdbe69a0a1563ab1c89b8";
const AMOUNT = "0.01";

if (!PRIVATE_KEY || !TOKEN_ADDRESS || !RECIPIENT) {
  throw new Error(
    "Missing env: RPC_URL, PRIVATE_KEY, TOKEN_ADDRESS, RECIPIENT"
  );
}

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
});

/**
 * permit + transferFrom に必要な最小ABI
 * - tokenによっては version() が無いので try/catch で "1" にフォールバックします
 */
const erc20PermitAbi = parseAbi([
  "function name() view returns (string)",
  "function version() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner,address spender) view returns (uint256)",
  "function nonces(address owner) view returns (uint256)",
  "function permit(address owner,address spender,uint256 value,uint256 deadline,uint8 v,bytes32 r,bytes32 s)",
  "function transferFrom(address from,address to,uint256 value) returns (bool)",
]);

async function main() {
  const owner = account.address;
  // 教育目的の「1ウォレット完結」: spenderもownerにする
  const spender = owner;

  const chainId = await publicClient.getChainId();

  const decimals = await publicClient.readContract({
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "decimals",
  });

  const value = parseUnits(AMOUNT, Number(decimals)); // bigint
  const now = Math.floor(Date.now() / 1000);
  const deadline = BigInt(now + 60 * 30); // 30分有効

  const [balanceBefore, nonce] = await Promise.all([
    publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: erc20PermitAbi,
      functionName: "balanceOf",
      args: [owner],
    }),
    publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: erc20PermitAbi,
      functionName: "nonces",
      args: [owner],
    }),
  ]);

  const name = await publicClient.readContract({
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "name",
  });

  let version = "1";
  try {
    version = await publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: erc20PermitAbi,
      functionName: "version",
    });
  } catch {
    // OZ ERC20Permit系など、version() を公開していないトークン向け
    version = "1";
  }

  console.log("--- setup ---");
  console.log({
    chainId,
    token: TOKEN_ADDRESS,
    owner,
    spender,
    recipient: RECIPIENT,
  });
  console.log({
    name,
    version,
    decimals: Number(decimals),
    value: value.toString(),
    deadline: deadline.toString(),
  });
  console.log({
    balanceBefore: balanceBefore.toString(),
    nonce: nonce.toString(),
  });

  // ① 署名（off-chain）: EIP-712 typed data を作って署名
  const domain = {
    name,
    version,
    chainId,
    verifyingContract: TOKEN_ADDRESS,
  } as const;

  const types = {
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
    spender,
    value,
    nonce,
    deadline,
  } as const;

  console.log({
    domain,
    types,
    primaryType: "Permit",
    message,
  });

  const signature = await account.signTypedData({
    domain,
    types,
    primaryType: "Permit",
    message,
  });

  const { r, s, yParity } = parseSignature(signature);
  const v = Number(yParity) + 27; // permit は v(27/28) を要求する実装が多い

  console.log("--- ① signed ---");
  console.log({ signature, v, r, s });

  // ② permit（on-chain）: 署名を渡して allowance を書き込む
  const allowanceBefore = await publicClient.readContract({
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "allowance",
    args: [owner, spender],
  });

  const { request: permitRequest } = await publicClient.simulateContract({
    account,
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "permit",
    args: [owner, spender, value, deadline, v, r, s],
  });

  const permitTxHash = await walletClient.writeContract(permitRequest);
  await publicClient.waitForTransactionReceipt({ hash: permitTxHash });

  const allowanceAfterPermit = await publicClient.readContract({
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "allowance",
    args: [owner, spender],
  });

  console.log("--- ② permit tx ---");
  console.log({
    permitTxHash,
    allowanceBefore: allowanceBefore.toString(),
    allowanceAfterPermit: allowanceAfterPermit.toString(),
  });

  // ③ transferFrom（on-chain）: spender(=owner)として transferFrom 実行
  const { request: transferRequest } = await publicClient.simulateContract({
    account,
    address: TOKEN_ADDRESS,
    abi: erc20PermitAbi,
    functionName: "transferFrom",
    args: [owner, RECIPIENT, value],
  });

  const transferTxHash = await walletClient.writeContract(transferRequest);
  await publicClient.waitForTransactionReceipt({ hash: transferTxHash });

  const [balanceAfter, allowanceAfterTransfer] = await Promise.all([
    publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: erc20PermitAbi,
      functionName: "balanceOf",
      args: [owner],
    }),
    publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: erc20PermitAbi,
      functionName: "allowance",
      args: [owner, spender],
    }),
  ]);

  console.log("--- ③ transferFrom tx ---");
  console.log({ transferTxHash });
  console.log({
    balanceAfter: balanceAfter.toString(),
    allowanceAfterTransfer: allowanceAfterTransfer.toString(),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
