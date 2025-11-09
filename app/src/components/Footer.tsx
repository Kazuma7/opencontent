"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-14 items-center justify-center px-4">
        <Link
          href="/contact"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          お問い合わせ
        </Link>
      </div>
    </footer>
  );
};
