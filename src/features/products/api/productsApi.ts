import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types";
import type {
  ProductQueryArgs,
  ProductQueryResponse,
  SearchResponse,
} from "../types";

/**
 * RTK Query API slice for products.
 * Handles fetching catalog data from mock JSON endpoints and performs server-side simulation of filters and sorting.
 */
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "data/products.json",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getFilteredProducts: builder.query<ProductQueryResponse, ProductQueryArgs>({
      query: () => "data/products.json",
      transformResponse: (response: Product[], _meta, arg) => {
        let filtered = [...response];

        // 1. Collection filter
        if (arg.collection && arg.collection.toLowerCase() !== "all") {
          filtered = filtered.filter(
            (p) => p.collection.toLowerCase() === arg.collection!.toLowerCase(),
          );
        }

        // 2. Category filter
        if (arg.category && arg.category.length > 0) {
          filtered = filtered.filter((p) =>
            arg.category!.some(
              (c) => c.toLowerCase() === p.category.toLowerCase(),
            ),
          );
        }

        // 3. Material filter
        if (arg.material && arg.material.length > 0) {
          filtered = filtered.filter((p) =>
            arg.material!.some(
              (m) => m.toLowerCase() === p.material.toLowerCase(),
            ),
          );
        }

        // 4. Gemstone filter
        if (arg.gemstone && arg.gemstone.length > 0) {
          filtered = filtered.filter((p) =>
            arg.gemstone!.some(
              (g) => g.toLowerCase() === p.gemstone.toLowerCase(),
            ),
          );
        }

        // 5. Price range filter
        if (arg.minPrice !== undefined && !isNaN(arg.minPrice)) {
          filtered = filtered.filter((p) => p.price >= arg.minPrice!);
        }
        if (arg.maxPrice !== undefined && !isNaN(arg.maxPrice)) {
          filtered = filtered.filter((p) => p.price <= arg.maxPrice!);
        }

        // 6. Sorting
        if (arg.sortBy) {
          switch (arg.sortBy) {
            case "newest":
              // Newest items first
              filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
              break;
            case "price-asc":
              // Price Low-High
              filtered.sort((a, b) => a.price - b.price);
              break;
            case "price-desc":
              // Price High-Low
              filtered.sort((a, b) => b.price - a.price);
              break;
            case "featured":
            default:
              // Featured sorting putting bestsellers and new items first
              filtered.sort((a, b) => {
                const scoreA = (a.isBestseller ? 2 : 0) + (a.isNew ? 1 : 0);
                const scoreB = (b.isBestseller ? 2 : 0) + (b.isNew ? 1 : 0);
                return scoreB - scoreA;
              });
              break;
          }
        }

        // 7. Pagination
        const totalCount = filtered.length;
        const page = arg.page || 1;
        const limit = arg.limit || 12;
        const totalPages = Math.ceil(totalCount / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filtered.slice(startIndex, endIndex);

        return {
          products: paginatedProducts,
          totalCount,
          totalPages,
          currentPage: page,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "PARTIAL_LIST" },
            ]
          : [{ type: "Product", id: "PARTIAL_LIST" }],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: () => "data/products.json",
      transformResponse: (response: Product[], _meta, arg) => {
        const found = response.find((p) => p.slug === arg);
        if (!found) {
          throw new Error(`Product with slug "${arg}" not found`);
        }
        return found;
      },
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg }],
    }),
    searchProducts: builder.query<SearchResponse, { q: string }>({
      query: () => "data/products.json",
      transformResponse: (response: Product[], _meta, arg) => {
        const q = (arg.q || "").trim().toLowerCase();
        if (q.length < 2) {
          return { data: [], totalCount: 0 };
        }

        const filtered = response.filter((p) => {
          const nameMatch = p.name.toLowerCase().includes(q);
          const categoryMatch = p.category.toLowerCase().includes(q);
          const collectionMatch = p.collection.toLowerCase().includes(q);
          const materialsMatch = p.materials.some((m) =>
            m.toLowerCase().includes(q),
          );
          return (
            nameMatch || categoryMatch || collectionMatch || materialsMatch
          );
        });

        return {
          data: filtered,
          totalCount: filtered.length,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "SEARCH_LIST" },
            ]
          : [{ type: "Product", id: "SEARCH_LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFilteredProductsQuery,
  useGetProductBySlugQuery,
  useSearchProductsQuery,
} = productsApi;
