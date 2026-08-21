import * as React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CartLineItem } from "@/features/cart/components/CartLineItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { CouponInput } from "@/features/cart/components/CouponInput";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

/**
 * CartPage - Main shopping bag destination page.
 * Manages dual layouts: an editorial empty-bag canvas, or a structured
 * split-screen listing of selected jewelry masterpieces paired with totals summaries.
 */
export const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  // 1. EMPTY CART editorial experience
  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[75vh] container mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        <div className="p-5 bg-secondary/50 rounded-none mb-6">
          <ShoppingBag className="h-8 w-8 text-muted-foreground stroke-[1.25]" />
        </div>
        <SectionHeading
          title="Your Atelier Selection is Empty"
          eyebrow="Shopping Cart"
          align="center"
          className="mb-4"
        />
        <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed max-w-md mb-10">
          We invite you to explore our peerless exhibitions of fine jewelry,
          bespoke engagement bands, and Swiss-made master horology.
        </p>
        <Button asChild variant="default" size="lg" className="uppercase tracking-widest px-10">
          <Link to="/collections/all">Discover The Catalog</Link>
        </Button>
      </div>
    );
  }

  // 2. COMPOSITE CART list and pricing totals
  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Understated Header */}
        <div className="border-b border-border pb-8 mb-8">
          <SectionHeading
            title="Your Atelier Selection"
            eyebrow={`Shopping Cart (${totalQuantity} Pieces)`}
            align="left"
          />
        </div>

        {/* TWO-COLUMN GRID SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Panel: Line Items */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="border-t border-border">
              {cartItems.map((item) => (
                <CartLineItem
                  key={`${item.product.id}-${item.selectedVariant || "default"}`}
                  item={item}
                />
              ))}
            </div>
            
            {/* Direct Back to shopping Link */}
            <div className="mt-8">
              <Button asChild variant="link" className="text-xs p-0 text-muted-foreground hover:text-accent">
                <Link to="/collections/all">← Continue Browsing the Catalog</Link>
              </Button>
            </div>
          </div>

          {/* Right Panel: Promo code & Price summary list */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <CouponInput />
            <CartSummary />
          </div>

        </div>

      </div>
    </div>
  );
};
