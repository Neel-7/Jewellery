import * as React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectWishlistItems, removeWishlistItem } from "@/features/wishlist/wishlistSlice";
import { addItem } from "@/features/cart/cartSlice";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

/**
 * WishlistPage - Displays user's bespoke desires / curated jewelry selections.
 * Allows items to be seamlessly moved to the cart or removed directly.
 */
export const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);

  // 1. EMPTY WISHLIST editorial experience
  if (wishlistItems.length === 0) {
    return (
      <div className="pt-24 sm:pt-36 pb-24 min-h-[75vh] container mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        <div className="p-5 bg-secondary/50 rounded-none mb-6">
          <Heart className="h-8 w-8 text-muted-foreground stroke-[1.25]" />
        </div>
        <SectionHeading
          title="Your Dream Collection is Empty"
          eyebrow="Bespoke Desires"
          align="center"
          className="mb-4"
        />
        <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed max-w-md mb-10">
          We invite you to explore our peerless exhibitions of fine jewelry,
          bespoke engagement bands, and Swiss-made master horology to begin your curated collection.
        </p>
        <Button asChild variant="default" size="lg" className="uppercase tracking-widest px-10">
          <Link to="/collections/all">Discover The Catalog</Link>
        </Button>
      </div>
    );
  }

  // 2. ACTIVE WISHLIST grid layout
  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeading
          title="Bespoke Desires"
          eyebrow="My Wishlist"
          align="left"
          className="mb-8"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-12 pt-8 border-t border-border">
          {wishlistItems.map((item) => (
            <div key={item.product.id} className="flex flex-col space-y-4">
              <ProductCard
                product={item.product}
                showRemoveButton={true}
                onRemove={(productId) => {
                  dispatch(removeWishlistItem(productId));
                  toast({
                    title: "Removed from Wishlist",
                    description: `"${item.product.name}" has been removed from your wishlist.`,
                    variant: "default",
                  });
                }}
              />
              <Button
                onClick={() => {
                  dispatch(addItem({ product: item.product, quantity: 1 }));
                  dispatch(removeWishlistItem(item.product.id));
                  toast({
                    title: "Moved to Basket",
                    description: `"${item.product.name}" has been moved to your basket.`,
                    variant: "success",
                  });
                }}
                variant="outline"
                size="sm"
                className="w-full text-[10px] uppercase tracking-wider h-10"
                disabled={!item.product.inStock}
              >
                Move to Basket
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
