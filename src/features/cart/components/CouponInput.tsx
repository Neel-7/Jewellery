import * as React from "react";
import { useLazyValidateCouponQuery } from "../api/couponApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { applyCoupon, removeCoupon } from "../cartSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XCircle, CheckCircle } from "lucide-react";

/**
 * CouponInput - Promo code application drawer.
 * Triggers lazy validation against the mock couponApi endpoint.
 * Showcases helpful success notifications or inline error indicators.
 */
export const CouponInput: React.FC = () => {
  const [code, setCode] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon);
  const [trigger, { isFetching }] = useLazyValidateCouponQuery();

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = code.trim();
    if (!trimmed) return;

    try {
      // Trigger lazy query
      const result = await trigger(trimmed).unwrap();

      if (result.valid) {
        dispatch(
          applyCoupon({
            code: trimmed.toUpperCase(),
            discountType: result.discountType,
            discountValue: result.discountValue,
            message: result.message,
          })
        );
        setCode("");
      } else {
        setErrorMsg(result.message);
      }
    } catch {
      setErrorMsg("Failed to validate coupon. Please try again.");
    }
  };

  const handleRemove = () => {
    dispatch(removeCoupon());
    setErrorMsg(null);
  };

  return (
    <div className="py-6 border-b border-border">
      <p className="text-[11px] font-sans tracking-luxury uppercase text-foreground/80 mb-3">
        Promotion Code
      </p>

      {appliedCoupon ? (
        // Applied state
        <div className="flex items-center justify-between bg-[#0a5c5a]/5 border border-[#0a5c5a]/20 p-4">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="h-4 w-4 text-[#0a5c5a] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-sans font-medium text-foreground tracking-wide uppercase">
                {appliedCoupon.code} Applied
              </span>
              <span className="text-[10px] font-sans text-muted-foreground mt-0.5">
                {appliedCoupon.message}
              </span>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-muted-foreground hover:text-destructive duration-300 transition-colors"
            aria-label="Remove promotion code"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // Input state
        <form onSubmit={handleApply} className="flex flex-col space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g. WELCOME10"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setErrorMsg(null);
              }}
              disabled={isFetching}
              className="text-xs font-sans h-10 tracking-widest uppercase rounded-none bg-background border-border focus:ring-accent"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={isFetching || !code.trim()}
              className="h-10 text-[10px] px-6 rounded-none font-sans tracking-widest"
            >
              {isFetching ? "Validating..." : "Apply"}
            </Button>
          </div>

          {errorMsg && (
            <p className="text-[10px] font-sans text-destructive tracking-wide flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <XCircle className="h-3.5 w-3.5" />
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
};
