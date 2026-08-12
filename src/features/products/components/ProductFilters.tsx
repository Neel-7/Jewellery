import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  categories: string[]
  materials: string[]
  gemstones: string[]
  minPrice?: number
  maxPrice?: number
  toggleCategory: (cat: string) => void
  toggleMaterial: (mat: string) => void
  toggleGemstone: (gem: string) => void
  setPriceRange: (min: number | undefined, max: number | undefined) => void
  clearAllFilters: () => void
  hideCategory?: boolean
}

const facetCategories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"]
const facetMaterials = ["Gold", "Platinum", "Silver", "Rose Gold"]
const facetGemstones = ["Diamond", "Sapphire", "Emerald", "Pearl", "None"]

/**
 * ProductFilters - Desktop sticky left sidebar & mobile drawer interior.
 * Renders accordions containing multi-select facets (Category, Material, Gemstone)
 * and price range inputs. Supports hideCategory when on a category-specific page.
 */
export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  materials,
  gemstones,
  minPrice,
  maxPrice,
  toggleCategory,
  toggleMaterial,
  toggleGemstone,
  setPriceRange,
  clearAllFilters,
  hideCategory = false,
}) => {
  const [minInput, setMinInput] = React.useState(minPrice?.toString() || "")
  const [maxInput, setMaxInput] = React.useState(maxPrice?.toString() || "")

  // Sync internal input state with outer props
  React.useEffect(() => {
    setMinInput(minPrice?.toString() || "")
  }, [minPrice])

  React.useEffect(() => {
    setMaxInput(maxPrice?.toString() || "")
  }, [maxPrice])

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault()
    const min = minInput ? parseInt(minInput, 10) : undefined
    const max = maxInput ? parseInt(maxInput, 10) : undefined
    setPriceRange(min, max)
  }

  const handlePriceReset = () => {
    setMinInput("")
    setMaxInput("")
    setPriceRange(undefined, undefined)
  }

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Active Filter Operations */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground">
          Filter By
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          Clear All
        </button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "material", "gemstone", "price"]} className="w-full">
        
        {/* Category Facet (conditionally rendered) */}
        {!hideCategory && (
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3 pt-2">
                {facetCategories.map((cat) => {
                  const checked = categories.includes(cat)
                  return (
                    <label key={cat} className="flex items-center gap-3 group cursor-pointer text-xs font-sans tracking-wide text-foreground">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat)}
                        className="h-3.5 w-3.5 border border-border text-accent focus:ring-accent rounded-none bg-transparent cursor-pointer"
                      />
                      <span className={checked ? "text-accent font-medium" : "text-muted-foreground group-hover:text-foreground duration-300"}>
                        {cat}
                      </span>
                    </label>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Material Facet */}
        <AccordionItem value="material">
          <AccordionTrigger>Material</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-3 pt-2">
              {facetMaterials.map((mat) => {
                const checked = materials.includes(mat)
                return (
                  <label key={mat} className="flex items-center gap-3 group cursor-pointer text-xs font-sans tracking-wide text-foreground">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMaterial(mat)}
                      className="h-3.5 w-3.5 border border-border text-accent focus:ring-accent rounded-none bg-transparent cursor-pointer"
                    />
                    <span className={checked ? "text-accent font-medium" : "text-muted-foreground group-hover:text-foreground duration-300"}>
                      {mat}
                    </span>
                  </label>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Gemstone Facet */}
        <AccordionItem value="gemstone">
          <AccordionTrigger>Gemstone</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-3 pt-2">
              {facetGemstones.map((gem) => {
                const checked = gemstones.includes(gem)
                return (
                  <label key={gem} className="flex items-center gap-3 group cursor-pointer text-xs font-sans tracking-wide text-foreground">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleGemstone(gem)}
                      className="h-3.5 w-3.5 border border-border text-accent focus:ring-accent rounded-none bg-transparent cursor-pointer"
                    />
                    <span className={checked ? "text-accent font-medium" : "text-muted-foreground group-hover:text-foreground duration-300"}>
                      {gem === "None" ? "No Gemstone" : gem}
                    </span>
                  </label>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Facet */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handlePriceApply} className="flex flex-col space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest">Min Price ($)</span>
                  <Input
                    type="number"
                    value={minInput}
                    onChange={(e) => setMinInput(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="h-9 px-2 text-xs"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest">Max Price ($)</span>
                  <Input
                    type="number"
                    value={maxInput}
                    onChange={(e) => setMaxInput(e.target.value)}
                    placeholder="100000"
                    min="0"
                    className="h-9 px-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="default" className="flex-1 h-9 text-[10px]">
                  Apply
                </Button>
                {(minPrice !== undefined || maxPrice !== undefined) && (
                  <Button type="button" onClick={handlePriceReset} variant="outline" className="h-9 px-3 text-[10px]">
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}