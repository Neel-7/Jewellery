import * as React from "react";
import { Link } from "react-router-dom";
import { useCartSummary } from "../hooks/useCartSummary";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck } from "lucide-react";

/**
 * CartSummary - Right column pricing card displaying sums and checkout triggers.
 * Demonstrates calculated subtotal, free-shipping evaluation, and coupon deductions.
 */
export const CartSummary: React.FC = () => {
  const {
    subtotal,
    shippingCost,
    discountAmount,
    grandTotal,
    freeShippingThreshold,
  } = useCartSummary();

  return (
    <div className="bg-secondary/40 border border-border p-6 sm:p-8 flex flex-col space-y-6">
      <h3 className="font-display text-lg font-light text-foreground uppercase tracking-widest pb-4 border-b border-border">
        Order Summary
      </h3>

      {/* Row details */}
      <div className="flex flex-col space-y-4 text-xs font-sans">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Shipping - with comment noting Epic 11 rules replacement later */}
        <div className="flex flex-col space-y-1 pb-4 border-b border-border">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>White-Glove Shipping</span>
            <span className="text-foreground font-medium">
              {shippingCost === 0 ? "Complimentary" : formatCurrency(shippingCost)}
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground/80 leading-relaxed italic">
            Complimentary shipping applied on selections above{" "}
            {formatCurrency(freeShippingThreshold)}.
          </p>
        </div>

        {/* Discount Row (only shown if a discount exists) */}
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-accent font-medium pb-4 border-b border-border animate-in fade-in duration-300">
            <span>Bespoke Promotion Discount</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        {/* Grand Total */}
        <div className="flex justify-between items-baseline pt-2">
          <span className="text-sm text-foreground uppercase tracking-wider font-semibold">
            Estimated Total
          </span>
          <span className="text-xl font-sans font-medium text-foreground tracking-wide">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      {/* CTA Trigger */}
      <Button asChild variant="accent" size="lg" className="w-full h-12 uppercase tracking-widest">
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>

      {/* Trust Signifiers */}
      <div className="flex flex-col gap-3.5 pt-4 text-[10px] font-sans text-muted-foreground leading-relaxed border-t border-border">
        <div className="flex gap-2.5 items-start">
          <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <span>
            <strong>Secure checkout</strong> verified with high-level SSL
            encryption. Transactions are completely safe and monitored.
          </span>
        </div>
        <div className="flex gap-2.5 items-start">
          <Truck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <span>
            <strong>Fully insured dispatch</strong>. Every Labonno selection is
            fully insured from our boutique vault to your doorstep.
          </span>
        </div>
      </div>
    </div>
  );
};
