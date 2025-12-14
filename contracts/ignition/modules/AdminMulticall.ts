import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AdminMulticallModule", (m) => {
  const admin = m.getAccount(0);
  const adminMulticall = m.contract("AdminMulticall", [admin]);

  return { adminMulticall };
});
