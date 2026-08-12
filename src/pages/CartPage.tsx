import * as React from "react"
import { SectionHeading } from "@/components/shared/SectionHeading"

export const CartPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[60vh] container mx-auto px-4 sm:px-8">
      <SectionHeading
        title="Your Atelier Selection"
        eyebrow="Shopping Cart"
        align="left"
      />
      <div className="py-12 border-t border-border text-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
        Your bespoke shopping selections and pricing summaries will occupy this space.
      </div>
    </div>
  )
}