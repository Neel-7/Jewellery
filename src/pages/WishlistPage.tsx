import * as React from "react"
import { SectionHeading } from "@/components/shared/SectionHeading"

export const WishlistPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[60vh] container mx-auto px-4 sm:px-8">
      <SectionHeading
        title="Bespoke Desires"
        eyebrow="My Wishlist"
        align="left"
      />
      <div className="py-12 border-t border-border text-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
        Your dream curations and gem preferences will persist inside this repository.
      </div>
    </div>
  )
}