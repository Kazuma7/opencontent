"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const ProductEditorView = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [usdcPrice, setUsdcPrice] = useState<string>("");
  const [jpycPrice, setJpycPrice] = useState<string>("");
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 1024 * 1024 * 1024; // 1GB
      if (file.size > maxSize) {
        alert("ファイルサイズは1GB以下である必要があります");
        return;
      }
      setContentFile(file);
    }
  };

  const handleThumbnailFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setThumbnailFiles([...thumbnailFiles, ...imageFiles]);
  };

  const removeThumbnailFile = (index: number) => {
    setThumbnailFiles(thumbnailFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!contentFile) {
      alert("コンテンツファイルを選択してください");
      return;
    }
    if (thumbnailFiles.length === 0) {
      alert("少なくとも1つのサムネイル画像をアップロードしてください");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // TODO: 実際のアップロード処理を実装
    // ここではシミュレーション
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // 実際の実装では、ここでファイルをアップロード
    // await uploadFile(contentFile, thumbnailFiles);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🧱 商品作成・編集画面</h1>
        <Button variant="outline" asChild>
          <Link href="/creator/products">商品一覧に戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>商品情報</CardTitle>
          <Button variant="outline" asChild>
            <Link href="/creator/products/1/preview">プレビュー</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="price">価格設定</TabsTrigger>
              <TabsTrigger value="upload">データアップロード</TabsTrigger>
              <TabsTrigger value="adult">アダルト設定</TabsTrigger>
              <TabsTrigger value="schedule">公開スケジュール</TabsTrigger>
            </TabsList>

            {/* 基本情報タブ */}
            <TabsContent value="basic" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">名前 *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="コンテンツ名を入力"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <textarea
                  id="description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={5}
                  placeholder="商品説明を入力"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ *</Label>
                <Select name="category" required>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wallpaper">壁紙</SelectItem>
                    <SelectItem value="model3d">3Dモデル</SelectItem>
                    <SelectItem value="illustration">イラスト</SelectItem>
                    <SelectItem value="ebook">電子書籍</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">サブカテゴリ</Label>
                <Input
                  id="subcategory"
                  type="text"
                  placeholder="サブカテゴリを入力（任意）"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">タグ</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    type="text"
                    placeholder="タグを入力してEnter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag}>追加</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 価格設定タブ */}
            <TabsContent value="price" className="mt-6 space-y-4">
              <div className="space-y-4">
                <Label>価格設定 *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="usdcPrice">USDC価格 *</Label>
                    <Input
                      id="usdcPrice"
                      type="number"
                      placeholder="1000"
                      value={usdcPrice}
                      onChange={(e) => setUsdcPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                    <p className="text-sm text-muted-foreground">USDCでの価格を入力（必須）</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jpycPrice">JPYC価格 *</Label>
                    <Input
                      id="jpycPrice"
                      type="number"
                      placeholder="1000"
                      value={jpycPrice}
                      onChange={(e) => setJpycPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                    <p className="text-sm text-muted-foreground">JPYCでの価格を入力（必須）</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  ※ コントラクトアドレスやチェーンIDは自動で設定されます。
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isAffiliateEnabled" />
                  <Label htmlFor="isAffiliateEnabled" className="cursor-pointer">
                    アフィリエイトを有効にする
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliateRate">アフィリエイト割合 (%)</Label>
                  <Input
                    id="affiliateRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                  <p className="text-sm text-muted-foreground">0-100の範囲で設定してください</p>
                </div>
              </div>
            </TabsContent>

            {/* データアップロードタブ */}
            <TabsContent value="upload" className="mt-6 space-y-6">
              {/* コンテンツファイルアップロード */}
              <div className="space-y-2">
                <Label htmlFor="contentFile">コンテンツファイル *</Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {contentFile ? (
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{contentFile.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({formatFileSize(contentFile.size)})
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setContentFile(null)}
                          >
                            削除
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          ファイルをドラッグ&ドロップするか、下のボタンから選択してください
                        </p>
                        <Input
                          id="contentFile"
                          type="file"
                          onChange={handleContentFileChange}
                          className="hidden"
                          accept="*/*"
                        />
                        <Label htmlFor="contentFile" className="cursor-pointer">
                          <div>
                            <Button type="button" variant="outline">
                              ファイルを選択
                            </Button>
                          </div>
                        </Label>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  最大1GBまでアップロード可能です
                </p>
              </div>

              <Separator />

              {/* サムネイル画像アップロード */}
              <div className="space-y-2">
                <Label htmlFor="thumbnailFiles">サムネイル画像 *</Label>
                <div className="space-y-4">
                  {thumbnailFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {thumbnailFiles.map((file, index) => (
                        <div key={index} className="relative border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium truncate flex-1">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeThumbnailFile(index)}
                            >
                              削除
                            </Button>
                          </div>
                          <div className="aspect-video bg-muted rounded flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Thumbnail ${index + 1}`}
                              className="max-w-full max-h-full object-contain rounded"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-2 border-dashed border-input rounded-lg p-4">
                    <Input
                      id="thumbnailFiles"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleThumbnailFilesChange}
                      className="hidden"
                    />
                    <Label htmlFor="thumbnailFiles" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div>
                          <Button type="button" variant="outline">
                            画像を追加
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          複数の画像を選択できます
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  少なくとも1つのサムネイル画像が必要です
                </p>
              </div>

              {/* アップロードボタン */}
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading || !contentFile || thumbnailFiles.length === 0}
                  className="w-full"
                >
                  {isUploading ? `アップロード中... ${uploadProgress}%` : "アップロード"}
                </Button>
                {isUploading && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* アダルト設定タブ */}
            <TabsContent value="adult" className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="isAdult" />
                <Label htmlFor="isAdult" className="cursor-pointer">
                  アダルトコンテンツとして設定する
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                アダルトコンテンツに設定すると、年齢確認が必要になります。
              </p>
            </TabsContent>

            {/* 公開スケジュールタブ */}
            <TabsContent value="schedule" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visibility">公開設定 *</Label>
                <Select name="visibility" required>
                  <SelectTrigger id="visibility" className="w-full">
                    <SelectValue placeholder="公開設定を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">公開</SelectItem>
                    <SelectItem value="private">非公開</SelectItem>
                    <SelectItem value="followers_only">フォロワーのみ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishStartAt">公開開始日時 *</Label>
                <Input
                  id="publishStartAt"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishEndAt">公開終了日時</Label>
                <Input
                  id="publishEndAt"
                  type="datetime-local"
                />
                <p className="text-sm text-muted-foreground">任意：設定しない場合は無期限で公開されます</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="saleStartAt">販売開始日時 *</Label>
                <Input
                  id="saleStartAt"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saleEndAt">販売終了日時</Label>
                <Input
                  id="saleEndAt"
                  type="datetime-local"
                />
                <p className="text-sm text-muted-foreground">任意：設定しない場合は無期限で販売されます</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/creator/products">キャンセル</Link>
        </Button>
        <Button type="button">
          保存
        </Button>
      </div>
    </div>
  );
};
