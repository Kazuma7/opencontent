"use server";

import { getSession } from "@/lib/auth";
import {
  createGasslessTransferService,
  SignedGassLessTransfer,
} from "@/lib/gassless-transfer";
import { thirdwebClient } from "@/lib/wagmi";
import { Address, isAddress, isAddressEqual } from "viem";

const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
if (!serverWalletAddress || !isAddress(serverWalletAddress)) {
  throw new Error("Invalid SERVER_WALLET_ADDRESS env");
}
const transferService = createGasslessTransferService({
  thirdwebClient,
  serverWalletAddress,
});

export async function issueGasslessTransfer(
  signedTransfer: SignedGassLessTransfer
) {
  "use server";

  const session = await getSession();
  const isAuthed = session.data.sessions.some((s) =>
    isAddressEqual(signedTransfer.owner, s.walletAddress as Address)
  );
  if (!isAuthed) return { success: false, message: "not_connected" } as const;

  return transferService.issueGasslessTransfer(signedTransfer);
}

export async function getTransferStatus(params: { transferId: string }) {
  "use server";

  return transferService.getTransferStatus(params);
}

export async function getTransactionHash(params: { transferId: string }) {
  "use server";

  return transferService.waitTransferTransactionHash(params);
}
