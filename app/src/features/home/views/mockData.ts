export interface SampleContent {
  id: number;
  category: string;
  title: string;
  creator: string;
  price?: number;
  priceRange?: { min: number; max: number };
}

export const newContents: SampleContent[] = [
  {
    id: 1,
    category: "ファッション",
    title: "3D Outfit Model",
    creator: "Creator Name",
    price: 1900,
  },
  {
    id: 2,
    category: "ファッション",
    title: "Cargo Half Pants",
    creator: "Creator Name",
    price: 1000,
  },
  {
    id: 3,
    category: "音声コンテンツ",
    title: "Travel Preparations",
    creator: "Creator Name",
    price: 200,
  },
  {
    id: 4,
    category: "ファッション",
    title: "VRChat Outfit",
    creator: "Creator Name",
    priceRange: { min: 2500, max: 5000 },
  },
  {
    id: 5,
    category: "ファッション",
    title: "Headphones",
    creator: "Creator Name",
    price: 700,
  },
  {
    id: 6,
    category: "ファッション",
    title: "Plus_Wear_01",
    creator: "Creator Name",
    price: 1800,
  },
];

export const popularContents: SampleContent[] = [
  {
    id: 7,
    category: "ファッション",
    title: "3D Outfit Model (Kimono)",
    creator: "Creator Name",
    price: 1900,
  },
  {
    id: 8,
    category: "ファッション",
    title: "3D Outfit Model (Afro)",
    creator: "Creator Name",
    price: 1800,
  },
  {
    id: 9,
    category: "イラスト",
    title: "Calendar",
    creator: "Creator Name",
    price: 700,
  },
  {
    id: 10,
    category: "ファッション",
    title: "Big Silhouette Parker",
    creator: "Creator Name",
    price: 500,
  },
  {
    id: 11,
    category: "電子書籍",
    title: "Photo Collection",
    creator: "Creator Name",
    price: 3000,
  },
  {
    id: 12,
    category: "音声コンテンツ",
    title: "Voice Alarm",
    creator: "Creator Name",
    priceRange: { min: 0, max: 500 },
  },
  {
    id: 13,
    category: "ファッション",
    title: "3D Outfit Model (Kimono)",
    creator: "Creator Name",
    price: 1900,
  },
  {
    id: 14,
    category: "ファッション",
    title: "3D Outfit Model (Afro)",
    creator: "Creator Name",
    price: 1800,
  },
  {
    id: 15,
    category: "イラスト",
    title: "Calendar",
    creator: "Creator Name",
    price: 700,
  },
  {
    id: 16,
    category: "ファッション",
    title: "Big Silhouette Parker",
    creator: "Creator Name",
    price: 500,
  },
  {
    id: 17,
    category: "電子書籍",
    title: "Photo Collection",
    creator: "Creator Name",
    price: 3000,
  },
  {
    id: 18,
    category: "音声コンテンツ",
    title: "Voice Alarm",
    creator: "Creator Name",
    priceRange: { min: 0, max: 500 },
  },
];
