"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  注文データがありません
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

