"use server";

import {
  createGasslessTransferService,
  SignedGassLessTransfer,
} from "@/lib/gassless-transfer";
import { thirdwebClient } from "@/lib/wagmi";
import { isAddress } from "viem";

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
