import * as React from "react"
import { useParams, Link } from "react-router-dom"
import { useGetProductBySlugQuery } from "@/features/products/api/productsApi"
import { useAppDispatch } from "@/app/hooks"
import { addItem } from "@/features/cart/cartSlice"
import {
  ProductGallery,
  ProductInfoPanel,
  RelatedProducts,
  StickyMobileBar,
} from "@/features/products/components"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

/**
 * ProductDetailPage - Orchestrates gallery, panel metadata, details accordions,
 * and cart dispatches for individual jewelry pieces.
 */
export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug || "")

  const handleMobileAdd = () => {
    if (product) {
      dispatch(addItem({ product, quantity: 1 }));
      alert(`Added 1 x "${product.name}" to your atelier selection.`);
    }
  }

  // 1. LOADING SKELETON STATE
  if (isLoading) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          <div className="lg:col-span-7">
            <Skeleton className="aspect-[3/4] w-full" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full animate-pulse" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // 2. ERROR / NOT FOUND STATE
  if (error || !product) {
    return (
      <div className="pt-40 pb-24 container mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-display font-light text-foreground mb-4">Piece Not Found</h2>
        <p className="text-xs font-sans text-muted-foreground leading-relaxed max-w-sm mb-8">
          The fine jewelry masterwork you are searching for is currently unavailable or doesn't exist in our vaults.
        </p>
        <Button asChild variant="outline">
          <Link to="/collections/all">Explore All Collections</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Understated Breadcrumbs */}
        <nav className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors duration-300">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors duration-300">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* GALLERY & INFO SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Info Summary */}
          <div className="lg:col-span-5">
            <ProductInfoPanel product={product} />
          </div>

        </div>

        {/* RELATED PRODUCTS SECTION */}
        <RelatedProducts category={product.category} currentProductId={product.id} />

        {/* FLOATING MOBILE BAR */}
        <StickyMobileBar product={product} onAdd={handleMobileAdd} />

      </div>
    </div>
  )
}