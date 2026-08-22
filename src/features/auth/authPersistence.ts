// TEMPORARY: demo-phase localStorage persistence for auth session.
// This entire file should be replaced by real cookie or session-based server-side
// auth (see Epic 02 in PRD) once the real auth backend is implemented.

import type { AuthUser } from "./authSlice";

export interface PersistedAuthState {
  user: AuthUser | null;
  token: string | null;
}

export const AUTH_STORAGE_KEY = "labonno_auth_demo";

/**
 * Safely loads persisted auth state from localStorage.
 * Returns null if not present or on any parsing/structure failure.
 */
export function loadAuthFromStorage(): PersistedAuthState | null {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (parsed && (parsed.user !== undefined || parsed.token !== undefined)) {
      return parsed as PersistedAuthState;
    }
    return null;
  } catch (error) {
    console.error("Failed to load auth from storage:", error);
    return null;
  }
}

/**
 * Safely saves persisted auth state to localStorage.
 * Catches quota or write errors and logs them without throwing.
 */
export function saveAuthToStorage(state: PersistedAuthState): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save auth to storage:", error);
  }
}

/**
 * Safely clears persisted auth state from localStorage.
 */
export function clearAuthFromStorage(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear auth from storage:", error);
  }
}
