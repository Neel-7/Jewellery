import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names safely, combining Tailwind CSS classes.
 * @param inputs - An array of class names, conditional values, or objects.
 * @returns A single string of merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}