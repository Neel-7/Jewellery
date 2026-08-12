import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SortDropdownProps {
  sortBy: "featured" | "newest" | "price-asc" | "price-desc"
  setSort: (sort: "featured" | "newest" | "price-asc" | "price-desc") => void
}

/**
 * SortDropdown - Composable sorting selector.
 * Wraps our custom Radix Select to let clients sort jewelry pieces alphabetically,
 * chronologically, or by luxury pricing thresholds.
 */
export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSort }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest whitespace-nowrap">
        Sort By:
      </span>
      <div className="w-[160px] sm:w-[180px]">
        <Select
          value={sortBy}
          onValueChange={(val) => setSort(val as "featured" | "newest" | "price-asc" | "price-desc")}
        >
          <SelectTrigger className="h-9 border-b border-border text-[10px] font-sans tracking-widest uppercase">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}