import type { Product } from "@/types";

export type {
  Product,
  ProductCategory,
  ProductMaterial,
  ProductGemstone,
  Media,
} from "@/types";

export interface ProductQueryArgs {
  category?: string[]; // e.g. ["Rings", "Earrings"]
  collection?: string; // e.g. "High Jewelry", "Fine Jewelry", "all"
  material?: string[]; // e.g. ["Gold", "Platinum"]
  gemstone?: string[]; // e.g. ["Diamond", "Emerald"]
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc";
  page?: number;
  limit?: number;
}

export interface ProductQueryResponse {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
