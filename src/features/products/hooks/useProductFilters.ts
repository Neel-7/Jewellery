import { useSearchParams } from "react-router-dom";
import type { ProductQueryArgs } from "../types";

/**
 * Custom hook to extract, synchronize, and update e-commerce catalog filter states
 * directly within the browser URL search params. Keeps url as single source of truth.
 */
export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. EXTRACT FROM SEARCH PARAMS
  const categories = searchParams.get("category")
    ? searchParams.get("category")!.split(",").filter(Boolean)
    : [];

  const materials = searchParams.get("material")
    ? searchParams.get("material")!.split(",").filter(Boolean)
    : [];

  const gemstones = searchParams.get("gemstone")
    ? searchParams.get("gemstone")!.split(",").filter(Boolean)
    : [];

  const minPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!, 10)
    : undefined;

  const maxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!, 10)
    : undefined;

  const sortBy = (searchParams.get("sort") || "featured") as ProductQueryArgs["sortBy"];

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;

  // 2. DERIVE PRODUCTS QUERY ARGS
  const queryArgs: ProductQueryArgs = {
    category: categories,
    material: materials,
    gemstone: gemstones,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit: 12, // Standard 12 items grid
  };

  // Helper function to update search params safely
  const updateParam = (
    key: string,
    value: string | string[] | number | undefined,
    resetPage: boolean = true
  ) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (resetPage) {
        next.set("page", "1");
      }

      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        next.delete(key);
      } else if (Array.isArray(value)) {
        next.set(key, value.join(","));
      } else {
        next.set(key, String(value));
      }

      return next;
    });
  };

  // Toggle single values (checkbox selectors)
  const toggleCategory = (cat: string) => {
    const updated = categories.includes(cat)
      ? categories.filter((c) => c !== cat)
      : [...categories, cat];
    updateParam("category", updated);
  };

  const toggleMaterial = (mat: string) => {
    const updated = materials.includes(mat)
      ? materials.filter((m) => m !== mat)
      : [...materials, mat];
    updateParam("material", updated);
  };

  const toggleGemstone = (gem: string) => {
    const updated = gemstones.includes(gem)
      ? gemstones.filter((g) => g !== gem)
      : [...gemstones, gem];
    updateParam("gemstone", updated);
  };

  // Update min/max bounds
  const setPriceRange = (min: number | undefined, max: number | undefined) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");

      if (min === undefined || isNaN(min)) {
        next.delete("minPrice");
      } else {
        next.set("minPrice", String(min));
      }

      if (max === undefined || isNaN(max)) {
        next.delete("maxPrice");
      } else {
        next.set("maxPrice", String(max));
      }

      return next;
    });
  };

  // Update sorting
  const setSort = (sort: ProductQueryArgs["sortBy"]) => {
    updateParam("sort", sort, false);
  };

  // Update current page
  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  // Reset all filters
  const clearAllFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();
      const sort = prev.get("sort");
      if (sort) {
        next.set("sort", sort);
      }
      return next;
    });
  };

  // Derived filter count for UI notification badges
  const activeFiltersCount =
    categories.length +
    materials.length +
    gemstones.length +
    (minPrice !== undefined ? 1 : 0) +
    (maxPrice !== undefined ? 1 : 0);

  return {
    categories,
    materials,
    gemstones,
    minPrice,
    maxPrice,
    sortBy,
    page,
    queryArgs,
    toggleCategory,
    toggleMaterial,
    toggleGemstone,
    setPriceRange,
    setSort,
    setPage,
    clearAllFilters,
    activeFiltersCount,
  };
}