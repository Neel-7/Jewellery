import * as React from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME } from "@/lib/constants";
import { LeftIcons, RightIcons } from "./HeaderIcons";
import { NavRow } from "./NavRow";
import { MobileNav } from "./MobileNav";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fdfbf7] border-b border-border text-foreground">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          {/* Column 1: Left utilities */}
          <div className="flex justify-start items-center">
            <MobileNav />
            <div className="hidden md:flex">
              <LeftIcons />
            </div>
          </div>

          {/* Column 2: Centered Standalone Brand wordmark */}
          <div className="flex justify-center text-center">
            <Link
              to="/"
              className="text-lg sm:text-2xl md:text-2xl xl:text-4xl font-display font-light tracking-luxury text-current whitespace-nowrap"
            >
              {BRAND_NAME}
            </Link>
          </div>

          {/* Column 3: Right utilities */}
          <div className="flex justify-end items-center">
            <RightIcons />
          </div>
        </div>
      </div>

      {/* Row 2: Navigation categories row for desktop */}
      <NavRow />
    </header>
  );
};
