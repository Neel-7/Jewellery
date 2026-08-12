import * as React from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart } from "lucide-react"
import { formatCurrency } from "@/lib/formatCurrency"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductCardProps {
  /** The product data object */
  product: Product
  /** Callback fired when clicking 'Quick Add' */
  onAddToCart?: (product: Product) => void
  /** Callback fired when clicking 'Wishlist' icon */
  onAddToWishlist?: (product: Product) => void
}

/**
 * ProductCard - Standard high-end catalog list item card.
 * Handles hovering to reveal an alternate lifestyle photo, displays elegant serif typography,
 * shows fine materials metadata, and incorporates a slick presentational quick-add slide-up.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  const { slug, name, price, images, materials, isNew, inStock } = product
  const primaryImage = images[0]
  const hoverImage = images[1] || images[0]

  return (
    <div className="group relative flex flex-col bg-background overflow-hidden transition-all duration-500">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden">
        {/* Wishlist Button */}
        <button
          onClick={() => onAddToWishlist?.(product)}
          className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm text-foreground hover:text-accent hover:bg-background transition-all duration-300 shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* New / Stock Status Badge */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge variant="accent" className="text-[8px] px-2 py-0.5 tracking-widest">
              New
            </Badge>
          )}
          {!inStock && (
            <Badge variant="outline" className="text-[8px] bg-background/90 px-2 py-0.5 tracking-widest">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Link wrapping images */}
        <Link to={`/products/${slug}`} className="block h-full w-full">
          {/* Main Image */}
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Image (Revealed on hover) */}
          {hoverImage && hoverImage.url !== primaryImage.url && (
            <img
              src={hoverImage.url}
              alt={hoverImage.altText || name}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </Link>

        {/* Quick Add Slide-up Panel (Desktop) */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 hidden sm:block">
          <Button
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            variant="default"
            className="w-full text-center hover:bg-primary/95 transition-colors h-12"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col pt-5 pb-2">
        <span className="text-[9px] font-sans tracking-widest text-muted-foreground uppercase mb-1">
          {materials[0] || "Maison Fine Jewelry"}
        </span>
        <h3 className="font-display text-base text-foreground font-light mb-1 hover:text-accent transition-colors duration-300">
          <Link to={`/products/${slug}`}>{name}</Link>
        </h3>
        <p className="text-xs font-sans font-medium text-foreground tracking-wide">
          {formatCurrency(price)}
        </p>
      </div>

      {/* Quick Add Button (Mobile-friendly) */}
      <div className="block sm:hidden mt-2">
        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!inStock}
          variant="outline"
          className="w-full h-10 text-[10px]"
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}