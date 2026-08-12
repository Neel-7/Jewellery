import * as React from "react"
import { ShoppingBag } from "lucide-react"
import { formatCurrency } from "@/lib/formatCurrency"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface StickyMobileBarProps {
  product: Product
  onAdd: () => void
}

/**
 * StickyMobileBar - Sticky bottom bar on mobile screens.
 * Monitors window scrolling to reveal a persistent action drawer displaying product price and Quick Buy.
 */
export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ product, onAdd }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Display bar once scrolled past 600px on viewports under lg (1024px)
      if (window.scrollY > 600 && window.innerWidth < 1024) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border p-4 shadow-xl flex items-center justify-between lg:hidden animate-in fade-in slide-in-from-bottom duration-300">
      <div className="flex flex-col pr-4 overflow-hidden">
        <span className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest truncate leading-none mb-1">
          {product.name}
        </span>
        <span className="text-xs font-sans font-semibold text-foreground">
          {formatCurrency(product.price)}
        </span>
      </div>
      <Button
        onClick={onAdd}
        disabled={!product.inStock}
        size="sm"
        variant="default"
        className="h-10 px-5 text-[10px] shrink-0"
      >
        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
        Add to Bag
      </Button>
    </div>
  )
}