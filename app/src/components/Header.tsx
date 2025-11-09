"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "自分のショップ", href: "/shop/1" },
    { label: "商品管理", href: "/creator/products" },
    { label: "注文一覧", href: "/creator/orders" },
    { label: "ショップ設定", href: "/creator/shop/settings" },
    { label: "購入履歴", href: "/purchase/history" },
    { label: "アカウント設定", href: "/creator/account/settings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">OpenContent</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="cursor-pointer">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {menuItems.map((item, index) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                  {index < menuItems.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
