"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// サンプルデータ
const newContents = [
  { id: 1, category: "ファッション", title: "3D Outfit Model", creator: "Creator Name", price: 1900 },
  { id: 2, category: "ファッション", title: "Cargo Half Pants", creator: "Creator Name", price: 1000 },
  { id: 3, category: "音声コンテンツ", title: "Travel Preparations", creator: "Creator Name", price: 200 },
  { id: 4, category: "ファッション", title: "VRChat Outfit", creator: "Creator Name", priceRange: { min: 2500, max: 5000 } },
  { id: 5, category: "ファッション", title: "Headphones", creator: "Creator Name", price: 700 },
  { id: 6, category: "ファッション", title: "Plus_Wear_01", creator: "Creator Name", price: 1800 },
];

const popularContents = [
  { id: 7, category: "ファッション", title: "3D Outfit Model (Kimono)", creator: "Creator Name", price: 1900 },
  { id: 8, category: "ファッション", title: "3D Outfit Model (Afro)", creator: "Creator Name", price: 1800 },
  { id: 9, category: "イラスト", title: "Calendar", creator: "Creator Name", price: 700 },
  { id: 10, category: "ファッション", title: "Big Silhouette Parker", creator: "Creator Name", price: 500 },
  { id: 11, category: "電子書籍", title: "Photo Collection", creator: "Creator Name", price: 3000 },
  { id: 12, category: "音声コンテンツ", title: "Voice Alarm", creator: "Creator Name", priceRange: { min: 0, max: 500 } },
  { id: 13, category: "ファッション", title: "3D Outfit Model (Kimono)", creator: "Creator Name", price: 1900 },
  { id: 14, category: "ファッション", title: "3D Outfit Model (Afro)", creator: "Creator Name", price: 1800 },
  { id: 15, category: "イラスト", title: "Calendar", creator: "Creator Name", price: 700 },
  { id: 16, category: "ファッション", title: "Big Silhouette Parker", creator: "Creator Name", price: 500 },
  { id: 17, category: "電子書籍", title: "Photo Collection", creator: "Creator Name", price: 3000 },
  { id: 18, category: "音声コンテンツ", title: "Voice Alarm", creator: "Creator Name", priceRange: { min: 0, max: 500 } },
];

export const HomeView = () => {
  return (
    <div className="container mx-auto max-w-[1300px] space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold"></h1>
        <Button asChild>
          <Link href="/contents">コンテンツ一覧</Link>
        </Button>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">新着コンテンツ</h2>
          <div className="grid space-y-5 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {newContents.map((content) => (
              <Link key={content.id} href={`/contents/${content.id}`}>
                <div className="group cursor-pointer space-y-2">
                  {/* 画像 */}
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">画像</p>
                    </div>
                  </div>
                  {/* カテゴリ */}
                  <p className="text-xs text-muted-foreground">{content.category}</p>
                  {/* タイトル */}
                  <p className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
                    {content.title}
                  </p>
                  {/* クリエイター */}
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <span className="text-[10px] font-semibold">
                        {content.creator.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{content.creator}</p>
                  </div>
                  {/* 価格 */}
                  <p className="text-sm font-semibold">
                    {content.priceRange
                      ? `${content.priceRange.min.toLocaleString()} ~ ${content.priceRange.max.toLocaleString()}円`
                      : `${content.price.toLocaleString()}円`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold">人気コンテンツ</h2>
          <div className="grid space-y-5 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {popularContents.map((content) => (
              <Link key={content.id} href={`/contents/${content.id}`}>
                <div className="group cursor-pointer space-y-2">
                  {/* 画像 */}
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">画像</p>
                    </div>
                  </div>
                  {/* カテゴリ */}
                  <p className="text-xs text-muted-foreground">{content.category}</p>
                  {/* タイトル */}
                  <p className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
                    {content.title}
                  </p>
                  {/* クリエイター */}
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <span className="text-[10px] font-semibold">
                        {content.creator.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{content.creator}</p>
                  </div>
                  {/* 価格 */}
                  <p className="text-sm font-semibold">
                    {content.priceRange
                      ? `${content.priceRange.min.toLocaleString()} ~ ${content.priceRange.max.toLocaleString()}円`
                      : `${content.price.toLocaleString()}円`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/contents">もっと見る</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

