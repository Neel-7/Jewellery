// TEMPORARY: demo-phase localStorage persistence. This entire file should be
// replaced by a real backend-backed wishlist endpoint (see Epic 08 in PRD) once
// auth/session infrastructure exists. Do not build additional features on top of
// this persistence layer assuming it is permanent.

import type { WishlistItem } from "@/types";

export const WISHLIST_STORAGE_KEY = "labonno_wishlist_demo";

/**
 * Safely loads wishlist items from localStorage.
 * Returns an empty array if not present or on any parsing failure.
 */
export function loadWishlistFromStorage(): WishlistItem[] {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed as WishlistItem[];
    }
    return [];
  } catch (error) {
    console.error("Failed to load wishlist from storage:", error);
    return [];
  }
}

/**
 * Safely saves wishlist items to localStorage.
 * Catches quota or write errors and logs them without throwing.
 */
export function saveWishlistToStorage(items: WishlistItem[]): void {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist to storage:", error);
  }
}
