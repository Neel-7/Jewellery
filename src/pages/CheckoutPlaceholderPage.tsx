import * as React from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

/**
 * CheckoutPlaceholderPage - Understated, temporary placeholder.
 * Points to Epic 15's checkout implementations scheduled in the roadmap.
 */
export const CheckoutPlaceholderPage: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-[75vh] container mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">
      <div className="p-5 bg-secondary/50 rounded-none mb-6">
        <Compass className="h-8 w-8 text-accent animate-spin duration-1000" style={{ animationDuration: "12s" }} />
      </div>
      <SectionHeading
        title="Atelier Checkout Coming Soon"
        eyebrow="Epic 15 Integration"
        align="center"
        className="mb-4"
      />
      <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed max-w-md mb-10">
        Our multi-stage secure shipping and billing system is currently being
        molded by our engineering artisans. We invite you to continue exploring
        our collections in the meantime.
      </p>
      <Button asChild variant="outline" size="lg" className="uppercase tracking-widest px-10">
        <Link to="/collections/all">Return To Collections</Link>
      </Button>
    </div>
  );
};
export default CheckoutPlaceholderPage;
