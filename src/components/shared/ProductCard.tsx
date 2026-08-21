import * as React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, X, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleWishlistItem, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { toast } from "@/components/ui/use-toast";
import { openQuickView } from "@/app/uiSlice";
import type { Product } from "@/types";

interface ProductCardProps {
  /** The product data object */
  product: Product;
  /** Callback fired when clicking 'Quick Add' */
  onAddToCart?: (product: Product) => void;
  /** Callback fired when clicking 'Wishlist' icon */
  onAddToWishlist?: (product: Product) => void;
  /** Optional prop to render a remove (X) button instead of heart */
  showRemoveButton?: boolean;
  /** Callback when removing product */
  onRemove?: (productId: string) => void;
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
  showRemoveButton = false,
  onRemove,
}) => {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const { slug, name, price, images, materials, isNew, inStock } = product;
  const primaryImage = images[0];
  const hoverImage = images[1] || images[0];

  return (
    <div className="group relative flex flex-col bg-background overflow-hidden transition-all duration-500">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden">
        {/* Wishlist / Remove Button */}
        {showRemoveButton ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.(product.id);
            }}
            className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm text-[#111111] hover:text-destructive hover:bg-background transition-all duration-300 shadow-sm"
            aria-label="Remove from wishlist"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const willBeWishlisted = !isWishlisted;
              dispatch(toggleWishlistItem(product));
              
              if (willBeWishlisted) {
                toast({
                  title: "Added to Wishlist",
                  description: `"${product.name}" has been added to your wishlist.`,
                  variant: "success",
                });
              } else {
                toast({
                  title: "Removed from Wishlist",
                  description: `"${product.name}" has been removed from your wishlist.`,
                  variant: "default",
                });
              }
              
              onAddToWishlist?.(product);
            }}
            className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-300 ${
                isWishlisted
                  ? "fill-[#0A5C5A] text-[#0A5C5A]"
                  : "text-[#111111] hover:text-[#0A5C5A]"
              }`}
            />
          </button>
        )}

        {/* New / Stock Status Badge */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge
              variant="accent"
              className="text-[8px] px-2 py-0.5 tracking-widest"
            >
              New
            </Badge>
          )}
          {!inStock && (
            <Badge
              variant="outline"
              className="text-[8px] bg-background/90 px-2 py-0.5 tracking-widest"
            >
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
        <div className="absolute bottom-0 inset-x-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 hidden sm:block z-20">
          <div className="flex w-full">
            <Button
              onClick={() => onAddToCart?.(product)}
              disabled={!inStock}
              variant="default"
              className="flex-grow text-center hover:bg-primary/95 transition-colors h-12 rounded-none"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(openQuickView(product.id));
              }}
              variant="default"
              className="px-4 hover:bg-primary/95 transition-colors h-12 rounded-none bg-primary/90 border-l border-primary-foreground/10"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col pt-5 pb-2">
        <span className="text-[9px] font-sans tracking-widest text-muted-foreground uppercase mb-1">
          {materials[0] || "Labonno Fine Jewelry"}
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
  );
};
