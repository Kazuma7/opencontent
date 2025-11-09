"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "pending" | "completed" | "cancelled" | "refunded";

interface Order {
  orderId: string;
  userId: string;
  userName: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  txHash: string;
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    orderId: "ORD-2024-001",
    userId: "user-001",
    userName: "山田太郎",
    status: "completed",
    amount: 1900,
    currency: "JPYC",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: "2024-01-15 10:30:00",
  },
  {
    orderId: "ORD-2024-002",
    userId: "user-002",
    userName: "佐藤花子",
    status: "completed",
    amount: 3500,
    currency: "USDC",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    createdAt: "2024-01-16 14:20:00",
  },
  {
    orderId: "ORD-2024-003",
    userId: "user-003",
    userName: "鈴木一郎",
    status: "pending",
    amount: 1200,
    currency: "JPYC",
    txHash: "0x9876543210fedcba9876543210fedcba98765432",
    createdAt: "2024-01-17 09:15:00",
  },
  {
    orderId: "ORD-2024-004",
    userId: "user-004",
    userName: "田中次郎",
    status: "completed",
    amount: 5000,
    currency: "USDC",
    txHash: "0xfedcba9876543210fedcba9876543210fedcba98",
    createdAt: "2024-01-18 16:45:00",
  },
  {
    orderId: "ORD-2024-005",
    userId: "user-005",
    userName: "伊藤三郎",
    status: "cancelled",
    amount: 2800,
    currency: "JPYC",
    txHash: "-",
    createdAt: "2024-01-19 11:00:00",
  },
  {
    orderId: "ORD-2024-006",
    userId: "user-006",
    userName: "渡辺四郎",
    status: "refunded",
    amount: 1500,
    currency: "USDC",
    txHash: "0x1111222233334444555566667777888899990000",
    createdAt: "2024-01-20 13:30:00",
  },
];

const getStatusBadge = (status: OrderStatus) => {
  const statusConfig = {
    pending: { label: "処理中", variant: "secondary" as const },
    completed: { label: "完了", variant: "default" as const },
    cancelled: { label: "キャンセル", variant: "destructive" as const },
    refunded: { label: "返金済み", variant: "outline" as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const formatAmount = (amount: number, currency: string) => {
  return `${amount.toLocaleString()} ${currency}`;
};

const formatTxHash = (txHash: string) => {
  if (txHash === "-") return "-";
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
};

export const OrdersView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">📑 注文一覧画面</h1>
      <Card>
        <CardHeader>
          <CardTitle>注文一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>注文ID</TableHead>
                <TableHead>ユーザー</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>TX情報</TableHead>
                <TableHead>日時</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    注文データがありません
                  </TableCell>
                </TableRow>
              ) : (
                mockOrders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="text-primary hover:underline"
                      >
                        {order.orderId}
                      </Link>
                    </TableCell>
                    <TableCell>{order.userName}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{formatAmount(order.amount, order.currency)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatTxHash(order.txHash)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.createdAt}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

