import hre from "hardhat";
import { keccak256, toHex } from "viem";
import AdminMulticall from "../ignition/modules/AdminMulticall.js";

const args = {
  role: keccak256(toHex("MULTICALLER_ROLE")),
  account: "0xD654AD5E5b36Eab6516e637578509088A9Df182D",
} as const;

async function main() {
  const connection = await hre.network.connect();
  const { adminMulticall } = await connection.ignition.deploy(AdminMulticall);
  const grantTx = await adminMulticall.write.grantRole([
    args.role,
    args.account,
  ]);
  console.log("Granted to tx hash:", grantTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
