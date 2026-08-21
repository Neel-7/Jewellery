import * as React from "react";

interface VariantSelectorProps {
  /** Derived options from product.materials */
  materials: string[];
  /** Product category to conditionally render ring sizes */
  category: string;
  /** Current selected material/metal */
  selectedMaterial: string;
  /** Callback when material changes */
  onMaterialChange: (value: string) => void;
  /** Current selected ring size */
  selectedSize?: string;
  /** Callback when ring size changes */
  onSizeChange?: (value: string) => void;
}

const RING_SIZES = ["4", "5", "6", "7", "8", "9", "10"];

/**
 * VariantSelector - A presentational selector for selecting metal/material
 * and ring size (for Rings category only). Styled with a luxury, sharp-corner,
 * high-contrast visual design.
 */
export const VariantSelector: React.FC<VariantSelectorProps> = ({
  materials,
  category,
  selectedMaterial,
  onMaterialChange,
  selectedSize,
  onSizeChange,
}) => {
  const isRing = category.toLowerCase() === "rings";

  return (
    <div className="space-y-4 pt-4 pb-2 border-t border-border">
      {/* Material Selector Row */}
      {materials.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground block">
            Select Metal / Material: <span className="text-foreground font-medium">{selectedMaterial}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {materials.map((mat) => {
              const isSelected = mat === selectedMaterial;
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => onMaterialChange(mat)}
                  className={`h-9 px-4 text-[10px] font-sans tracking-widest uppercase border transition-all duration-300 rounded-none ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground font-medium"
                      : "border-border bg-background hover:bg-secondary text-foreground"
                  }`}
                >
                  {mat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ring Size Selector Row (Conditional) */}
      {isRing && onSizeChange && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground block">
              Size (US): <span className="text-foreground font-medium">{selectedSize || "Select"}</span>
            </span>
            <span className="text-[9px] font-sans text-muted-foreground italic tracking-wide">
              *Sizes are cosmetic & subject to atelier availability
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {RING_SIZES.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeChange(size)}
                  className={`h-9 w-9 flex items-center justify-center text-[10px] font-sans border transition-all duration-300 rounded-none ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground font-medium"
                      : "border-border bg-background hover:bg-secondary text-foreground"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
