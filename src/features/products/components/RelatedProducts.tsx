import * as React from "react"
import { useGetFilteredProductsQuery } from "../api/productsApi"
import { ProductCard } from "@/components/shared/ProductCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Skeleton } from "@/components/ui/skeleton"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

/**
 * RelatedProducts - "You May Also Like" recommendation grid.
 * Dynamically queries similar catalog items by category and narrows it down to four distinct pieces.
 */
export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  currentProductId,
}) => {
  // Retrieve 5 matching items to guarantee 4 unique recommendations after excluding current ID
  const { data, isLoading } = useGetFilteredProductsQuery({
    category: [category],
    limit: 5,
  })

  const relatedItems = React.useMemo(() => {
    if (!data?.products) return [];
    return data.products
      .filter((p) => p.id !== currentProductId)
      .slice(0, 4);
  }, [data, currentProductId]);

  if (isLoading) {
    return (
      <div className="mt-20 border-t border-border pt-16">
        <SectionHeading title="You May Also Like" eyebrow="The Curation" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-1/3 animate-pulse" />
              <Skeleton className="h-6 w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedItems.length === 0) return null;

  return (
    <div className="mt-20 border-t border-border pt-16">
      <SectionHeading title="You May Also Like" eyebrow="The Curation" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {relatedItems.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  )
}