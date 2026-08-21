import * as React from "react"
import { ProductCard } from "@/components/shared/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/app/hooks"
import { addItem } from "@/features/cart/cartSlice"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[] | undefined
  isLoading: boolean
  clearAllFilters: () => void
}

/**
 * ProductGrid - Renders a beautifully spaced grid of jewelry products.
 * Includes elegant pulse skeletons for fetching states, and a styled empty state
 * when no pieces match the currently active facets.
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  clearAllFilters,
}) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ product, quantity: 1 }))
    toast({
      title: "Added to Basket",
      description: `"${product.name}" has been added to your atelier selection.`,
      variant: "success",
    })
  }

  // 1. LOADING SKELETON STATE
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  // 2. EMPTY STATE
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-lg font-display font-light text-foreground mb-3">
          No Masterpieces Found
        </h3>
        <p className="text-xs font-sans text-muted-foreground max-w-sm mb-6 leading-relaxed">
          No jewelry matching your exact filter criteria exists in our catalog. Try clearing or expanding your facets.
        </p>
        <Button onClick={clearAllFilters} variant="outline" size="sm">
          Clear All Filters
        </Button>
      </div>
    )
  }

  // 3. CATALOG GRID LIST
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  )
}