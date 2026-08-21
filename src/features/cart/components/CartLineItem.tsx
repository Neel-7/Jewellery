import * as React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { updateQuantity, removeItem } from "@/features/cart/cartSlice";
import { formatCurrency } from "@/lib/formatCurrency";
import type { CartItem } from "@/types";

interface CartLineItemProps {
  item: CartItem;
}

/**
 * CartLineItem - Elegantly styled product row inside the basket.
 * Incorporates a premium square quantity stepper, live line calculations,
 * and a tactile deletion trigger.
 */
export const CartLineItem: React.FC<CartLineItemProps> = ({ item }) => {
  const { product, quantity, selectedVariant } = item;
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(
      updateQuantity({
        productId: product.id,
        selectedVariant,
        quantity: quantity + 1,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(
        updateQuantity({
          productId: product.id,
          selectedVariant,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeItem({ productId: product.id, selectedVariant }));
  };

  const primaryImage = product.images[0];
  const lineTotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-b border-border bg-background transition-all duration-300">
      {/* Product Information Link Block */}
      <div className="flex items-center gap-6 flex-grow">
        {/* Thumbnail Image container (Sharp borders) */}
        <Link
          to={`/products/${product.slug}`}
          className="w-20 sm:w-24 aspect-[3/4] bg-secondary overflow-hidden border border-border/40 shrink-0 block"
        >
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || product.name}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Name and Variant specifications */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-sans tracking-luxury uppercase text-accent">
            {product.collection}
          </span>
          <h3 className="font-display text-base text-foreground font-light hover:text-accent duration-300">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">
            SKU: {product.sku}
          </p>
          {selectedVariant && (
            <span className="text-[10px] font-sans text-accent font-medium uppercase tracking-widest mt-1">
              Spec: {selectedVariant}
            </span>
          )}
        </div>
      </div>

      {/* Pricing and Stepper interactions */}
      <div className="flex items-center justify-between sm:justify-end gap-8 sm:gap-12 shrink-0">
        {/* Stepper with sharp boundaries */}
        <div className="flex items-center border border-border bg-background h-10">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="px-3 h-full text-foreground hover:bg-secondary duration-300 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-10 text-center text-xs font-sans font-medium text-foreground select-none">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="px-3 h-full text-foreground hover:bg-secondary duration-300 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        {/* Pricing Summaries */}
        <div className="flex flex-col text-right min-w-[80px]">
          <span className="text-xs font-sans text-muted-foreground">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm font-sans font-medium text-foreground tracking-wide mt-0.5">
            {formatCurrency(lineTotal)}
          </span>
        </div>

        {/* Deletion Trigger */}
        <button
          onClick={handleRemove}
          className="p-2 text-muted-foreground hover:text-destructive hover:bg-secondary/40 duration-300 transition-colors"
          aria-label={`Remove ${product.name} from basket`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
