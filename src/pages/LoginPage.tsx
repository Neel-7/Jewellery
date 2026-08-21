import * as React from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const LoginPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeading
          title="Sign In to Labonno"
          eyebrow="Credentials"
          align="center"
          className="mb-8"
        />
        <div className="max-w-md mx-auto py-12 border-t border-border text-center text-xs font-sans text-muted-foreground uppercase tracking-widest">
          The login portal will receive standard Zod schema-based validation in
          the follow-up.
        </div>
      </div>
    </div>
  );
};
