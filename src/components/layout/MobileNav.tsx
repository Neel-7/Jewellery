import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { NAVIGATION_CATEGORIES } from "@/features/navigation/navConfig";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const MobileNav: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Close Sheet on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="p-1.5 -ml-1.5 text-current hover:text-accent duration-300 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-[#fdfbf7] text-foreground flex flex-col justify-between h-full p-6 w-[300px] border-r border-border"
        >
          <div className="overflow-y-auto pr-1">
            <SheetHeader className="border-b border-border pb-4 mb-4">
              <SheetTitle className="text-lg font-display font-light text-foreground text-left tracking-widest">
                {BRAND_NAME}
              </SheetTitle>
            </SheetHeader>

            <Accordion type="single" collapsible className="w-full">
              {NAVIGATION_CATEGORIES.map((cat, idx) => (
                <AccordionItem
                  value={`item-${idx}`}
                  key={cat.name}
                  className="border-border/60"
                >
                  <AccordionTrigger className="text-[11px] py-3 tracking-widest">
                    {cat.name}
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 flex flex-col gap-2 pt-1 pb-3">
                    <Link
                      to={cat.href}
                      className="text-[11px] font-sans uppercase tracking-widest text-[#1a3a3a] font-medium py-1"
                    >
                      Shop All {cat.name}
                    </Link>
                    {cat.subCategories.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-border/40">
              <Link
                to="/collections/labonno"
                className="text-[11px] font-display italic tracking-wider text-[#1a3a3a]"
              >
                World of Labonno
              </Link>
              <Link
                to="/account"
                className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Boutique Account
              </Link>
              <Link
                to="/wishlist"
                className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Wishlist
              </Link>
            </div>
          </div>

          <div className="border-t border-border/60 pt-4 text-[9px] font-sans text-muted-foreground leading-relaxed">
            <p className="font-semibold uppercase tracking-widest mb-1 text-foreground">
              Labonno Concierge
            </p>
            <p>{CONTACT_EMAIL}</p>
            <p>{CONTACT_PHONE}</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
