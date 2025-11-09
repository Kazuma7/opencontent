"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ProductPreviewView = () => {
  const thumbnailImages = [1, 2, 3, 4, 5, 6, 7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tags = [
    "#Sumi3D",
    "#3Dモデル",
    "#3D衣装",
    "#3DCG",
    "#VRChat",
    "#VRChat想定モデル",
    "#VRC",
    "#VRChat想定",
    "#VRChat衣装",
    "#墨澄ちゃん対応",
  ];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? thumbnailImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === thumbnailImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container mx-auto max-w-[1200px] space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">プレビュー確認画面</h1>
        <Button variant="outline" asChild>
          <Link href="/creator/products/1/edit">編集に戻る</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 左カラム */}
        <div className="space-y-1">
          {/* メイン画像 */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted group">
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-muted-foreground">画像 {thumbnailImages[currentImageIndex]}</p>
            </div>
            {/* 左矢印 */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="前の画像"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* 右矢印 */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="次の画像"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 画像群（サムネイル） */}
          <div className="grid grid-cols-6 gap-1">
            {thumbnailImages.map((i, index) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(index)}
                className="relative aspect-square w-full overflow-hidden bg-muted"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-xs text-muted-foreground">{i}</p>
                </div>
                {index !== currentImageIndex && (
                  <div className="absolute inset-0 bg-black/20 transition-opacity hover:opacity-0" />
                )}
              </button>
            ))}
          </div>

          {/* 商品説明 */}
          <div className="space-y-2 mt-10">
            <h3 className="text-lg font-semibold">
              &ldquo;墨澄ちゃん&rdquo;専用 【3D衣装モデル】 ポワニー/Powanii
            </h3>
            <p className="text-sm text-muted-foreground">
              Noah&apos;sArkが制作したオリジナル3D衣装モデルです。
            </p>
            <p className="text-sm text-muted-foreground">
              購入前に説明文と利用規約をご確認ください。
            </p>
          </div>
        </div>

        {/* 右カラム */}
        <div className="space-y-4">
          {/* カテゴリ */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">ファッション</p>
          </div>

          {/* ショップ情報 */}
          <div className="flex items-center gap-2">
            <Link href="/shop/1" className="flex items-center gap-2 hover:opacity-90">
              <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center">
                <span className="text-[10px] font-semibold text-white">NA</span>
              </div>
              <span className="text-sm text-muted-foreground">Noah&apos;sArk</span>
            </Link>
          </div>

          {/* コンテンツ名 */}
          <h1 className="text-2xl font-bold">
            &ldquo;墨澄ちゃん&rdquo;専用 【3D衣装モデル】ポワニー/Powanii
          </h1>

          {/* 値段 */}
          <p className="text-xl font-bold">1,900円 (税込)</p>

          {/* プレビュー用の注意書き */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ これはプレビュー画面です。実際の購入はできません。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* ブックマークボタン */}
            <Button variant="outline" className="w-full cursor-pointer">
              ブックマーク
            </Button>

            {/* いいねボタン */}
            <Button variant="outline" className="w-full cursor-pointer">
              いいね
            </Button>
          </div>

          {/* タグ一覧 */}
          <div className="space-y-2">
            <p className="text-sm font-medium">関連タグ</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/creator/products/1/edit">編集に戻る</Link>
        </Button>
      </div>
    </div>
  );
};
