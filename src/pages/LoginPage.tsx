import * as React from "react"
import { SectionHeading } from "@/components/shared/SectionHeading"

export const LoginPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[60vh] container mx-auto px-4 sm:px-8">
      <SectionHeading
        title="Sign In to Maison"
        eyebrow="Credentials"
        align="center"
      />
      <div className="max-w-md mx-auto py-12 border-t border-border text-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
        The login portal will receive standard Zod schema-based validation in the follow-up.
      </div>
    </div>
  )
}