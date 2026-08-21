import * as React from "react";
import { Link } from "react-router-dom";
import type { NavigationCategory } from "@/features/navigation/navConfig";
import { CuratedCard } from "@/features/products/components/CuratedCard";

interface MegaMenuProps {
  category: NavigationCategory;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  return (
    <div
      className="absolute left-0 right-0 top-full w-full bg-[#fdfbf7] border-t border-border border-b border-border shadow-md animate-in fade-in slide-in-from-top-1 duration-200 z-50"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-8 py-10 grid grid-cols-12 gap-8">
        {/* Left Zone: Sub-category List */}
        <div className="col-span-3 border-r border-border/60 pr-8">
          <p className="text-[11px] font-sans tracking-luxury uppercase text-muted-foreground mb-4">
            Shop by Style
          </p>
          <ul className="flex flex-col gap-3">
            {category.subCategories.map((sub) => (
              <li key={sub.name}>
                <Link
                  to={sub.href}
                  onClick={onClose}
                  className="text-xs font-sans uppercase tracking-widest text-foreground hover:text-accent transition-colors duration-200 block py-1"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Zone: Horizontal Product Thumbnails */}
        <div className="col-span-9 pl-4">
          <p className="text-[11px] font-sans tracking-luxury uppercase text-muted-foreground mb-4">
            Featured Curations
          </p>
          <div className="grid grid-cols-3 gap-6">
            {category.thumbnails.map((thumb) => (
              <CuratedCard
                key={thumb.caption}
                imageUrl={thumb.imageUrl}
                caption={thumb.caption}
                href={thumb.href}
                onClick={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
