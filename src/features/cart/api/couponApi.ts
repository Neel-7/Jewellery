import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CouponValidationResponse {
  valid: boolean;
  discountType: "percentage" | "fixed";
  discountValue: number;
  message: string;
}

/**
 * RTK Query API slice for Coupon codes.
 * Simulated client-side endpoint for promo code validation.
 * In a future pass (Epic 16), this will connect to the real backend coupon endpoint.
 */
export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    validateCoupon: builder.query<CouponValidationResponse, string>({
      // We query a mock base url, then intercept and mock response using transformResponse
      query: (code) => `data/products.json?mockCoupon=${code}`,
      transformResponse: (_response, _meta, code): CouponValidationResponse => {
        const sanitized = code.toUpperCase().trim();

        if (sanitized === "WELCOME10") {
          return {
            valid: true,
            discountType: "percentage",
            discountValue: 10,
            message: "WELCOME10 applied: 10% discount subtracted.",
          };
        }

        if (sanitized === "LUXURY500") {
          return {
            valid: true,
            discountType: "fixed",
            discountValue: 500,
            message: "LUXURY500 applied: $500 flat discount subtracted.",
          };
        }

        return {
          valid: false,
          discountType: "percentage",
          discountValue: 0,
          message: "Invalid or expired promotion code.",
        };
      },
    }),
  }),
});

export const { useLazyValidateCouponQuery } = couponApi;
