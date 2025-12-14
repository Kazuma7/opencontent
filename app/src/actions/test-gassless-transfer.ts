import {
  createGasslessTransferService,
  SignedGassLessTransfer,
} from "@/lib/gassless-transfer";
import { thirdwebClient } from "@/lib/wagmi";
import { isAddress } from "viem";

export async function issueGasslessTransfer(
  signedTransfer: SignedGassLessTransfer
) {
  "use server";

  const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
  if (!serverWalletAddress || !isAddress(serverWalletAddress)) {
    throw new Error("Invalid SERVER_WALLET_ADDRESS env");
  }
  const transferService = createGasslessTransferService({
    thirdwebClient,
    serverWalletAddress,
  });

  return transferService.issueGasslessTransfer(signedTransfer);
}
