import * as React from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

export const NotFound: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-[70vh] container mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center">
      <SectionHeading
        title="This Room is Empty"
        eyebrow="404 — Not Found"
        align="center"
      />
      <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-md mb-8">
        The boutique salon or gemstone exhibit you are looking for has been
        moved or does not exist. Let us guide you back to the center salon.
      </p>
      <Button asChild>
        <Link to="/">Return to Labonno</Link>
      </Button>
    </div>
  );
};
