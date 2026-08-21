import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NAVIGATION_CATEGORIES,
  type NavigationCategory,
} from "@/features/navigation/navConfig";
import { MegaMenu } from "./MegaMenu";

export const NavRow: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] =
    React.useState<NavigationCategory | null>(null);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = React.useState(location.pathname);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setHoveredCategory(null);
  }

  const isActive = (href: string) => {
    if (location.pathname === href) return true;
    const slug = href.split("/").pop() || "";
    return location.pathname.toLowerCase().includes(slug.toLowerCase());
  };

  return (
    <div
      className="hidden md:block relative border-b border-border bg-[#fdfbf7]/95 backdrop-blur-md text-foreground transition-all duration-300"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="container mx-auto px-8">
        <nav className="flex items-center justify-center h-12 gap-8 lg:gap-12">
          {NAVIGATION_CATEGORIES.map((cat) => {
            const active = isActive(cat.href);
            const isHovered = hoveredCategory?.name === cat.name;
            const showUnderline = active || isHovered;

            return (
              <div
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat)}
                className="h-full flex items-center relative"
              >
                <Link
                  to={cat.href}
                  className={cn(
                    "text-[10px] lg:text-[11px] font-sans tracking-luxury uppercase text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1",
                    active && "text-foreground font-medium",
                  )}
                >
                  {cat.name}
                  {/* Tiffany-style thin active & hover-persisted underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[1px] bg-foreground transition-transform duration-300 origin-center scale-x-0",
                      showUnderline && "scale-x-100",
                    )}
                  />
                </Link>
              </div>
            );
          })}

          {/* Bullet/Divider */}
          <span className="text-border text-xs">•</span>

          {/* Editorial Link: World of Labonno */}
          <Link
            to="/collections/labonno"
            className={cn(
              "text-xs font-display italic tracking-wider transition-colors text-[#1a3a3a] hover:opacity-80",
              isActive("/collections/labonno") &&
                "underline underline-offset-4",
            )}
          >
            World of Labonno
          </Link>
        </nav>
      </div>

      {/* Mega-menu absolute panel */}
      {hoveredCategory && (
        <MegaMenu
          category={hoveredCategory}
          onClose={() => setHoveredCategory(null)}
        />
      )}
    </div>
  );
};
