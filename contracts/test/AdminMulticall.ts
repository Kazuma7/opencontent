import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { network } from "hardhat";
import { encodeFunctionData, keccak256, stringToBytes } from "viem";

describe("AdminMulticall", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [adminWallet, otherWallet] = await viem.getWalletClients();

  const MULTICALLER_ROLE = keccak256(stringToBytes("MULTICALLER_ROLE"));

  let adminMulticall: Awaited<ReturnType<typeof viem.deployContract>>;

  beforeEach(async () => {
    adminMulticall = await viem.deployContract("AdminMulticall", [
      adminWallet.account.address,
    ]);
  });

  it("grants admin and multicaller roles to the constructor admin", async () => {
    const defaultAdminRole = await adminMulticall.read.DEFAULT_ADMIN_ROLE();

    assert.equal(
      await adminMulticall.read.hasRole([defaultAdminRole, adminWallet.account.address]),
      true,
    );
    assert.equal(
      await adminMulticall.read.hasRole([MULTICALLER_ROLE, adminWallet.account.address]),
      true,
    );
  });

  it("rejects multicall entrypoints from non-members", async () => {
    await viem.assertions.revertWithCustomError(
      adminMulticall.write.aggregate([[]], { account: otherWallet.account }),
      adminMulticall,
      "AccessControlUnauthorizedAccount",
    );
  });

  it("executes aggregate as a multicaller and mutates targets", async () => {
    const counter = await viem.deployContract("Counter");

    const calls = [
      {
        target: counter.address,
        callData: encodeFunctionData({
          abi: counter.abi,
          functionName: "inc",
          args: [],
        }),
      },
      {
        target: counter.address,
        callData: encodeFunctionData({
          abi: counter.abi,
          functionName: "incBy",
          args: [2n],
        }),
      },
    ];

    await adminMulticall.write.aggregate([calls], { account: adminWallet.account });

    assert.equal(await counter.read.x(), 3n);
  });

  it("reports failures without reverting when requireSuccess is false", async () => {
    const counter = await viem.deployContract("Counter");

    const failingCall = {
      target: counter.address,
      callData: encodeFunctionData({
        abi: counter.abi,
        functionName: "incBy",
        args: [0n],
      }),
    };

    const okCall = {
      target: counter.address,
      callData: encodeFunctionData({
        abi: counter.abi,
        functionName: "inc",
        args: [],
      }),
    };

    const { result } = await publicClient.simulateContract({
      address: adminMulticall.address,
      abi: adminMulticall.abi,
      functionName: "tryAggregate",
      args: [false, [failingCall, okCall]],
      account: adminWallet.account,
    });

    assert.equal(result[0].success, false);
    assert.equal(result[1].success, true);
  });

  it("reverts when requireSuccess is true and a call fails", async () => {
    const counter = await viem.deployContract("Counter");

    const failingCall = {
      target: counter.address,
      callData: encodeFunctionData({
        abi: counter.abi,
        functionName: "incBy",
        args: [0n],
      }),
    };

    await viem.assertions.revertWith(
      adminMulticall.write.tryAggregate([true, [failingCall]], {
        account: adminWallet.account,
      }),
      "Multicall3: call failed",
    );
  });

  it("enforces msg.value matching the sum of call values in aggregate3Value", async () => {
    // Use zero value in call but send nonzero msg.value so only the final
    // value-mismatch check triggers the revert (no intermediate call failure).
    await viem.assertions.revertWith(
      adminMulticall.write.aggregate3Value([
        [
          {
            target: otherWallet.account.address,
            allowFailure: false,
            value: 0n,
            callData: "0x",
          },
        ],
      ], {
        account: adminWallet.account,
        value: 1n,
      }),
      "Multicall3: value mismatch",
    );
  });

  it("forwards ether to targets through aggregate3Value", async () => {
    const recipient = otherWallet.account.address;
    const value = 1_000_000_000_000_000n; // 0.001 ether

    const balanceBefore = await publicClient.getBalance({ address: recipient });

    await adminMulticall.write.aggregate3Value([
      [
        {
          target: recipient,
          allowFailure: false,
          value,
          callData: "0x",
        },
      ],
    ], {
      account: adminWallet.account,
      value,
    });

    const balanceAfter = await publicClient.getBalance({ address: recipient });
    assert.equal(balanceAfter - balanceBefore, value);
  });
});
