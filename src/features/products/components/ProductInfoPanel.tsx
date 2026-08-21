import * as React from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addItem } from "@/features/cart/cartSlice";
import { toggleWishlistItem, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { formatCurrency } from "@/lib/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RatingStars } from "./RatingStars";
import { VariantSelector } from "./VariantSelector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/types";

interface ProductInfoPanelProps {
  product: Product;
}

/**
 * ProductInfoPanel - Right column detail summary.
 * Embeds price displays, rating summaries, stock status badges, dynamic quantity select,
 * Add to Basket actions, and collapsible specification details.
 */
export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const {
    name,
    price,
    compareAtPrice,
    collection,
    category,
    rating,
    ratingCount,
    description,
    materials,
    inStock,
    sku,
  } = product;

  const [selectedMaterial, setSelectedMaterial] = React.useState<string>(
    materials[0] || product.material
  );
  const [selectedSize, setSelectedSize] = React.useState<string | undefined>(
    category === "Rings" ? "6" : undefined
  );

  const handleAddToCart = () => {
    const selectedVariant = category === "Rings" && selectedSize
      ? `${selectedMaterial} / Size ${selectedSize}`
      : selectedMaterial;

    dispatch(addItem({ product, quantity, selectedVariant }));
    toast({
      title: "Added to Basket",
      description: `Added ${quantity} x "${name}" (${selectedVariant}) to your atelier selection.`,
      variant: "success",
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-[10px] font-sans tracking-luxury uppercase text-accent block">
            {collection} — {category}
          </span>
          {!inStock && (
            <Badge
              variant="outline"
              className="text-[8px] bg-background/90 px-2 py-0.5 tracking-widest border-destructive text-destructive uppercase"
            >
              Out of Stock
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-light text-foreground tracking-wide leading-tight">
          {name}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-border">
        <RatingStars rating={rating} ratingCount={ratingCount} />
        <div className="flex items-baseline gap-3">
          {compareAtPrice && (
            <span className="text-xs font-sans text-muted-foreground line-through">
              {formatCurrency(compareAtPrice)}
            </span>
          )}
          <span className="text-lg font-sans font-medium text-foreground tracking-wide">
            {formatCurrency(price)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {materials.map((mat) => (
          <Badge
            key={mat}
            variant="outline"
            className="text-[9px] px-2 py-0.5 bg-secondary/30"
          >
            {mat}
          </Badge>
        ))}
        <Badge
          variant={inStock ? "secondary" : "destructive"}
          className="text-[9px] px-2 py-0.5"
        >
          {inStock ? "In Stock" : "Unavailable"}
        </Badge>
      </div>

      <p className="text-xs font-sans text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Variant Selector */}
      <VariantSelector
        materials={materials}
        category={category}
        selectedMaterial={selectedMaterial}
        onMaterialChange={setSelectedMaterial}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <div className="flex flex-col space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border bg-background h-11">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={!inStock}
              className="px-3 h-full"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-sans font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={!inStock}
              className="px-3 h-full"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            variant="default"
            className="flex-1 h-11 text-xs"
          >
            {inStock ? (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
              </>
            ) : (
              "Out of Stock"
            )}
          </Button>

          <button
            onClick={() => {
              dispatch(toggleWishlistItem(product));
            }}
            className={`p-3 border border-border h-11 w-11 flex items-center justify-center transition-colors duration-300 ${isWishlisted ? "bg-[#0A5C5A]/10 border-[#0A5C5A] text-[#0A5C5A]" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-[#0A5C5A] text-[#0A5C5A]" : ""}`} />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Accordion
          type="single"
          collapsible
          defaultValue="details"
          className="w-full"
        >
          <AccordionItem value="details">
            <AccordionTrigger className="py-2.5 text-[10px]">
              Details & Materials
            </AccordionTrigger>
            <AccordionContent className="text-[11px] leading-relaxed text-muted-foreground space-y-1.5 pt-2">
              <p>
                Meticulously hand-sculpted in our boutique atelier to assure
                perfection of form, symmetry, and wearability.
              </p>
              <p>
                Materials: {materials.join(", ")} | SKU: {sku}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="py-2.5 text-[10px]">
              Shipping & Returns
            </AccordionTrigger>
            <AccordionContent className="text-[11px] leading-relaxed text-muted-foreground pt-2">
              Complimentary secure, signature-required delivery. Returns are
              accepted within 30 days in pristine condition.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
