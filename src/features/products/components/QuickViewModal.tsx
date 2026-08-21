import * as React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetProductsQuery } from "@/features/products/api/productsApi";
import { closeQuickView } from "@/app/uiSlice";
import { addItem } from "@/features/cart/cartSlice";
import { toggleWishlistItem, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { formatCurrency } from "@/lib/formatCurrency";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

/**
 * QuickViewModal - Epic 4.5 Quick Product Preview.
 * Renders as a Radix Dialog displaying key product metadata, a quantity stepper,
 * Add to Basket actions, Wishlist toggling, and links to full product page.
 */
export const QuickViewModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = React.useState(1);

  const quickViewProductId = useAppSelector((state) => state.ui.quickViewProductId);
  const { data: products } = useGetProductsQuery();
  const product = products?.find((p) => p.id === quickViewProductId);

  const isWishlisted = useAppSelector(
    selectIsWishlisted(product?.id || "")
  );

  React.useEffect(() => {
    if (quickViewProductId) {
      setQuantity(1);
    }
  }, [quickViewProductId]);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity }));
    toast({
      title: "Added to Basket",
      description: `Added ${quantity} x "${product.name}" to your atelier selection.`,
      variant: "success",
    });
  };

  const primaryImage = product.images[0];

  return (
    <Dialog
      open={!!quickViewProductId}
      onOpenChange={(open) => {
        if (!open) dispatch(closeQuickView());
      }}
    >
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-6 sm:p-8 rounded-none gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-4 sm:mt-0">
          {/* Product Image */}
          <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden rounded-none border border-border">
            <img
              src={primaryImage?.url}
              alt={primaryImage?.altText || product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="text-[10px] font-sans tracking-luxury uppercase text-accent mb-1 block">
                {product.collection} — {product.category}
              </span>
              <h2 className="text-xl font-display font-light text-foreground tracking-wide leading-tight mb-2">
                {product.name}
              </h2>
              <p className="text-sm font-sans font-medium text-foreground tracking-wide">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="text-xs font-sans text-muted-foreground leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <div className="flex flex-col space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-border bg-background h-10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="px-2.5 h-full text-foreground disabled:opacity-50"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-sans font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="px-2.5 h-full text-foreground disabled:opacity-50"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Add to Basket */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  variant="default"
                  className="flex-1 h-10 text-xs rounded-none bg-primary text-primary-foreground hover:bg-primary/95"
                >
                  <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add to Bag
                </Button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => {
                    dispatch(toggleWishlistItem(product));
                    toast({
                      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
                      description: isWishlisted
                        ? `"${product.name}" has been removed from your wishlist.`
                        : `"${product.name}" has been added to your wishlist.`,
                      variant: isWishlisted ? "default" : "success",
                    });
                  }}
                  className={`p-2.5 border h-10 w-10 flex items-center justify-center transition-colors duration-300 rounded-none ${
                    isWishlisted
                      ? "bg-accent/10 border-accent text-accent"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-left">
              <Link
                to={`/products/${product.slug}`}
                onClick={() => dispatch(closeQuickView())}
                className="text-xs font-sans text-muted-foreground hover:text-foreground underline underline-offset-4 tracking-wide transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
