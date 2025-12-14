"use client";

import {
  useConnection,
  useConnect,
  useDisconnect,
  useConnectors,
  useReadContract,
  useBlockNumber,
} from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  erc20Abi,
  formatUnits,
  isAddress,
  parseUnits,
  zeroAddress,
} from "viem";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useSignGassLessTransfer } from "@/hooks/gassless-transfer";
import {
  getTransactionHash,
  getTransferStatus,
  issueGasslessTransfer,
} from "@/actions/test-gassless-transfer";
import Link from "next/link";

const USDC = {
  address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as const,
  symbol: "USDC",
  decimals: 6,
};

type TransferPhase =
  | "idle"
  | "signing"
  | "relaying"
  | "confirming"
  | "done"
  | "error";

export function WalletConnect() {
  const { address, isConnected, chainId } = useConnection();
  const { disconnect } = useDisconnect();

  const { signGassLessTransfer } = useSignGassLessTransfer();

  const [amount, setAmount] = useState("0.00001");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transferId, setTransferId] = useState<string | null>(null);
  const [phase, setPhase] = useState<TransferPhase>("idle");
  const [to, setTo] = useState<string>("");

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const {
    data: usdcBalance,
    isFetching: isBalanceFetching,
    refetch: refetchBalance,
  } = useReadContract({
    address: USDC.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
  });

  const { data: transferStatus } = useQuery({
    queryKey: ["transfer-status", transferId],
    enabled: !!transferId,
    refetchInterval: 1500,
    queryFn: ({ queryKey: [_, transferId] }) => {
      if (!transferId) return null;
      return getTransferStatus({ transferId });
    },
  });

  const { data: transactionHash } = useQuery({
    queryKey: ["transfer-hash", transferId],
    enabled: !!transferId,
    refetchInterval: 1500,
    queryFn: ({ queryKey: [_, transferId] }) => {
      if (!transferId) return null;
      return getTransactionHash({ transferId });
    },
  });

  const formattedBalance = useMemo(() => {
    if (usdcBalance === undefined) return "-";
    try {
      return Number(
        formatUnits(usdcBalance as bigint, USDC.decimals)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      });
    } catch {
      return String(usdcBalance);
    }
  }, [usdcBalance]);

  useEffect(() => {
    setMessage(null);
    setError(null);
    setTransferId(null);
    setPhase("idle");
    if (address) {
      setTo(address);
    }
  }, [address]);

  useEffect(() => {
    if (transactionHash?.txHash) {
      setPhase("done");
      setMessage("トランザクションがネットワークに反映されました");
    }
  }, [transactionHash?.txHash]);

  useEffect(() => {
    if (!transferStatus) return;
    const status = transferStatus.status as string;
    if (status?.toLowerCase().includes("error")) {
      setPhase("error");
      setError("リレーでエラーが発生しました");
    }
  }, [transferStatus]);

  useEffect(() => {
    refetchBalance();
  }, [blockNumber]);

  const testGassLessTransfer = async () => {
    if (!address) return;
    try {
      if (!isAddress(to)) {
        setError("送金先アドレスが不正です");
        return;
      }
      const parsedAmount = parseUnits(amount || "0", USDC.decimals);
      if (parsedAmount <= BigInt(0)) {
        setError("送金額を 0 より大きい値で入力してください");
        return;
      }

      setError(null);
      setMessage("Permit 署名中…");
      setPhase("signing");
      setTransferId(null);

      const signed = await signGassLessTransfer({
        owner: address,
        chainId: 11155111,
        tokenAddress: USDC.address,
        transfers: [{ to, value: parsedAmount }],
      });

      setMessage("サーバーに送信中…");
      setPhase("relaying");

      const result = await issueGasslessTransfer(signed);
      if (!result.success) {
        setPhase("error");
        setError(`送信に失敗しました: ${result.message}`);
        return;
      }

      setPhase("confirming");
      setMessage("リレー完了。反映を待っています");
      setTransferId(result.transferId);
    } catch (err) {
      setPhase("error");
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    }
  };

  const shortText = (value?: string | null, head = 6, tail = 4) => {
    if (!value) return "-";
    if (value.length <= head + tail) return value;
    return `${value.slice(0, head)}...${value.slice(-tail)}`;
  };

  const isSending =
    phase === "signing" || phase === "relaying" || phase === "confirming";

  return (
    <Card className="border-dashed bg-muted/40">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">
          ガスレス送金デモ（Sepolia / {USDC.symbol}）
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          接続 → Permit 署名 → サーバーが送金 →
          ネットワーク反映までを一連で確認できます。
          送金先と金額を入力して試せます（デフォルトは自分宛）。
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              ウォレットを接続してデモを開始してください。
            </p>
            <Button asChild>
              <Link href="/auth/login">ログインする</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-3 rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">
                    接続中のアドレス
                  </p>
                  <p className="font-semibold leading-tight">{address}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {USDC.symbol} 残高
                </span>
                <span className="font-semibold">
                  {isBalanceFetching
                    ? "取得中…"
                    : `${formattedBalance} ${USDC.symbol}`}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => disconnect()}
                >
                  切断
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => testGassLessTransfer()}
                  disabled={isSending}
                >
                  {isSending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  ガスレス送金を試す
                </Button>
              </div>

              <div className="space-y-2 rounded-md bg-muted/60 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">送金先</span>
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-9 w-[240px]"
                    placeholder="0x..."
                    disabled={isSending}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">送金額</span>
                  <div className="flex items-center gap-2">
                    <Input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-9 w-28"
                      type="number"
                      step="0.00001"
                      min="0"
                      disabled={isSending}
                    />
                    <Label className="text-xs text-muted-foreground">
                      {USDC.symbol}
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  自分宛てに {USDC.symbol} を送ります（Permit
                  を利用したガスレス転送）。
                </p>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {message && !error && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}
            </div>

            <div className="space-y-3 rounded-lg border bg-background p-4 text-sm">
              <p className="text-xs font-semibold text-muted-foreground">
                進捗
              </p>
              <StepItem
                label="ウォレット接続"
                state={isConnected ? "done" : "idle"}
                helper={shortText(address)}
              />
              <StepItem
                label="Permit 署名"
                state={
                  phase === "signing"
                    ? "active"
                    : phase !== "idle"
                      ? "done"
                      : "idle"
                }
                helper={
                  phase === "signing"
                    ? "署名待ち"
                    : transferId
                      ? "完了"
                      : "未開始"
                }
              />
              <StepItem
                label="サーバーに送信"
                state={
                  phase === "relaying" ? "active" : transferId ? "done" : "idle"
                }
                helper={transferStatus?.status ?? "待機中"}
              />
              <StepItem
                label="ネットワーク反映"
                state={
                  transactionHash?.txHash
                    ? "done"
                    : phase === "confirming"
                      ? "active"
                      : "idle"
                }
                helper={
                  transactionHash?.txHash
                    ? shortText(transactionHash.txHash)
                    : "数秒〜1分"
                }
              />
              {transferId && (
                <div className="rounded-md bg-muted/60 p-3">
                  <p className="text-xs text-muted-foreground">transferId</p>
                  <p className="font-mono text-xs">{transferId}</p>
                </div>
              )}
              {transactionHash?.txHash && (
                <div className="rounded-md bg-muted/60 p-3">
                  <p className="text-xs text-muted-foreground">
                    Transaction Hash
                  </p>
                  <p className="font-mono text-xs break-all">
                    {transactionHash.txHash}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type StepVisualState = "idle" | "active" | "done";

const StepItem = ({
  label,
  helper,
  state,
}: {
  label: string;
  helper?: string | null;
  state: StepVisualState;
}) => {
  const iconMap = {
    idle: <span className="mr-2 h-2 w-2 rounded-full bg-muted-foreground/40" />,
    active: <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />,
    done: <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />,
  };

  return (
    <div className="flex items-start gap-2 rounded-md border border-dashed p-2">
      {iconMap[state]}
      <div className="space-y-0.5">
        <p className="text-sm font-medium leading-tight">{label}</p>
        {helper && (
          <p className="text-xs leading-tight text-muted-foreground">
            {helper}
          </p>
        )}
      </div>
    </div>
  );
};
