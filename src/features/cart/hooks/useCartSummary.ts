import { useAppSelector } from "@/app/hooks";

export interface CartSummaryData {
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  grandTotal: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
}

/**
 * useCartSummary - Custom hook to calculate shopping cart pricing summaries.
 * Employs a mocked $2,500 free shipping threshold and calculates applied promo discounts.
 * 
 * NOTE: Estimated shipping logic is mocked here and will be replaced by the
 * real shipping-rules endpoint from Epic 11 in a future pass.
 */
export function useCartSummary(): CartSummaryData {
  const subtotal = useAppSelector((state) => state.cart.totalPrice);
  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon);

  const freeShippingThreshold = 2500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  
  // Luxury White-Glove Shipping is $150 if under the threshold, and $0 if cart is empty or above threshold
  const shippingCost = subtotal === 0 || isFreeShipping ? 0 : 150;

  // Calculate applied coupon discount
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round(subtotal * (appliedCoupon.discountValue / 100));
    } else if (appliedCoupon.discountType === "fixed") {
      discountAmount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  const grandTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  return {
    subtotal,
    shippingCost,
    discountAmount,
    grandTotal,
    freeShippingThreshold,
    isFreeShipping,
  };
}
