import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react"
import { useAppSelector } from "@/app/hooks"
import { cn } from "@/lib/utils"
import { BRAND_NAME, NAVIGATION_LINKS } from "@/lib/constants"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"
  
  // Retrieve cart quantity at top level in strict accordance with the Rules of Hooks
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header style based on route and scroll state
  const isTransparent = isHome && !isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out border-b",
        isTransparent
          ? "bg-transparent border-transparent text-white"
          : "bg-background/95 backdrop-blur-md border-border text-foreground shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-8">
        {/* Top bar: Mobile Menu (left) / Brand Logo (center) / Utilities (right) */}
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <div className="flex sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 text-current hover:text-accent duration-300" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background text-foreground flex flex-col justify-between h-full p-8 w-[320px]">
                <div>
                  <SheetHeader className="border-b border-border pb-6 mb-8">
                    <SheetTitle className="text-xl font-display font-light text-foreground">{BRAND_NAME}</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6">
                    {NAVIGATION_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="text-sm font-sans tracking-widest uppercase text-foreground hover:text-accent transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-[1px] bg-border my-2" />
                    <Link
                      to="/account"
                      className="text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Boutique Account
                    </Link>
                    <Link
                      to="/wishlist"
                      className="text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Wishlist
                    </Link>
                  </nav>
                </div>
                <div className="border-t border-border pt-6 text-[10px] font-sans text-muted-foreground leading-relaxed">
                  <p className="font-medium uppercase tracking-widest mb-1">Maison Concierge</p>
                  <p>concierge@maisonaurelia.com</p>
                  <p>+1 (800) 555-AURE</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Left Navigation */}
          <nav className="hidden sm:flex items-center gap-8 flex-1">
            <Link
              to="/collections/high-jewelry"
              className="text-[10px] font-sans tracking-luxury uppercase hover:text-accent transition-colors duration-300"
            >
              High Jewelry
            </Link>
            <Link
              to="/collections/fine-jewelry"
              className="text-[10px] font-sans tracking-luxury uppercase hover:text-accent transition-colors duration-300"
            >
              Fine Jewelry
            </Link>
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex justify-center flex-1 sm:flex-initial">
            <Link
              to="/"
              className="text-lg sm:text-2xl font-display font-light tracking-luxury text-current hover:opacity-80 transition-opacity"
            >
              {BRAND_NAME}
            </Link>
          </div>

          {/* Desktop Right Nav & Utilities */}
          <div className="flex items-center justify-end gap-2 sm:gap-6 flex-1">
            <Link
              to="/collections/timepieces"
              className="hidden sm:inline-block text-[10px] font-sans tracking-luxury uppercase hover:text-accent transition-colors duration-300"
            >
              Timepieces
            </Link>
            
            <button className="p-2 text-current hover:text-accent duration-300" aria-label="Search">
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
            </button>
            <Link to="/account" className="p-2 text-current hover:text-accent duration-300 hidden sm:inline-block" aria-label="Account">
              <User className="h-4 sm:h-5 w-4 sm:w-5" />
            </Link>
            <Link to="/wishlist" className="p-2 text-current hover:text-accent duration-300 relative" aria-label="Wishlist">
              <Heart className="h-4 sm:h-5 w-4 sm:w-5" />
            </Link>
            <Link to="/cart" className="p-2 text-current hover:text-accent duration-300 relative" aria-label="Cart">
              <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[8px] font-sans font-semibold rounded-full h-4 w-4 flex items-center justify-center border border-background">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Sub-menu (Desktop only, centered beneath) */}
        <div className="hidden sm:flex h-10 items-center justify-center gap-10 border-t border-current/10 py-2">
          <Link
            to="/collections/bridal"
            className="text-[10px] font-sans tracking-luxury uppercase hover:text-accent transition-colors duration-300"
          >
            Engagement & Bridal
          </Link>
          <Link
            to="/collections/maison"
            className="text-[10px] font-sans tracking-luxury uppercase hover:text-accent transition-colors duration-300"
          >
            Maison Collections
          </Link>
        </div>
      </div>
    </header>
  )
}