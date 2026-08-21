import * as React from "react"
import { SectionHeading } from "@/components/shared/SectionHeading"

export const AccountPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeading
          title="Boutique Member Portal"
          eyebrow="Account"
          align="left"
          className="mb-8"
        />
        <div className="py-12 border-t border-border text-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
          This private area for orders, appointments, and membership stats is currently locked.
        </div>
      </div>
    </div>
  )
}