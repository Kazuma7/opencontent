"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// サンプル商品データ
const shopProducts = [
  {
    id: 1,
    image: "ポワニー/Powanii",
    category: "ファッション",
    title: "「墨澄ちゃん」専用 【3D衣装モデル】 ポワニー/ Powanii",
    price: 1900,
  },
  {
    id: 2,
    image: "手鞠",
    category: "ファッション",
    title: "「墨澄ちゃん」専用 【3D衣装モデル】手鞠",
    price: 1900,
  },
  {
    id: 3,
    image: "アフロ",
    category: "ファッション",
    title: "「墨澄ちゃん」専用 【3D衣装モデル】 アフロ",
    price: 1800,
  },
  {
    id: 4,
    image: "HARUHI",
    category: "ファッション",
    title: "「墨澄ちゃん」専用 【3D衣装モデル】 HARUHI 「春日」",
    price: 1800,
  },
];

export const ShopDetailView = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* トップバナー（黒背景） */}
      <div className="bg-black py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* ロゴ（白いダイヤモンド形状とNA文字） */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">NA</div>
              </div>
            </div>
            {/* ショップ名 */}
            <h1 className="text-3xl font-semibold text-white">
              Noah&apos;s Ark
            </h1>
          </div>
        </div>
      </div>

      {/* プロフィールセクション */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start mt-8">
          {/* プロフィール画像（円形、黒背景、バナーと重なる） */}
          <div className="-mt-24 shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-background bg-black">
              <div className="text-center">
                <div className="text-xl font-bold text-white">NA</div>
                <div className="text-xs text-white">Noah&apos;s Ark</div>
              </div>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="flex-1 space-y-2">
            <div>
              <h2 className="text-2xl font-bold">Noah&apos;sArk</h2>
              <p className="text-sm text-muted-foreground">NoahsArk</p>
            </div>
            <p className="text-sm text-muted-foreground">
              ノア / 2D/3D/VR designer
            </p>
            {/* ソーシャルアイコン */}
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* フォローボタン */}
          <div className="shrink-0">
            <Button className="bg-[#067bbf] hover:bg-[#067bbf]/90">
              フォロー
            </Button>
          </div>
        </div>

        {/* デジタルコンテンツセクション */}
        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-semibold">コンテンツ</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mb-24">
            {shopProducts.map((product) => (
              <Link key={product.id} href={`/contents/${product.id}`}>
                <div className="group cursor-pointer space-y-2">
                  {/* 商品画像 */}
                  <div className="aspect-square w-full overflow-hidden bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        {product.image}
                      </p>
                    </div>
                  </div>
                  {/* カテゴリ */}
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                  {/* タイトル */}
                  <p className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
                    {product.title}
                  </p>
                  {/* ショップ名とロゴ */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-black flex items-center justify-center">
                      <span className="text-[8px] font-semibold text-white">
                        NA
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Noah&apos;sArk
                    </p>
                  </div>
                  {/* 価格 */}
                  <p className="text-sm font-semibold">
                    {product.price.toLocaleString()}円
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
