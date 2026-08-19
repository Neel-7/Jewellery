/**
 * Global shared types for Labonno.
 */

export interface Media {
  url: string;
  altText?: string;
  type: "image" | "video";
}

export interface Money {
  amount: number;
  currency: string;
}

export type ProductCategory =
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets"
  | "Watches";
export type ProductMaterial = "Gold" | "Platinum" | "Silver" | "Rose Gold";
export type ProductGemstone =
  | "Diamond"
  | "Sapphire"
  | "Emerald"
  | "Pearl"
  | "None";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: Media[];
  materials: string[]; // Detailed tags like ["18k White Gold", "Diamonds (4.25ctw)"]
  category: ProductCategory;
  collection: string; // e.g., "High Jewelry", "Fine Jewelry", "Bridal"
  material: ProductMaterial; // Normalized facet: "Gold" | "Platinum" | "Silver" | "Rose Gold"
  gemstone: ProductGemstone; // Normalized facet: "Diamond" | "Sapphire" | "Emerald" | "Pearl" | "None"
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
  ratingCount?: number;
  inStock: boolean;
  sku: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  featuredImage: Media;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string; // e.g., ring size, metal choice
}

export interface WishlistItem {
  product: Product;
}
