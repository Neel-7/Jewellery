import * as React from "react"
import { useParams, Link } from "react-router-dom"
import { useGetFilteredProductsQuery } from "@/features/products/api/productsApi"
import { useProductFilters } from "@/features/products/hooks/useProductFilters"
import {
  ProductFilters,
  SortDropdown,
  ProductGrid,
  Pagination,
} from "@/features/products/components"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

/**
 * Editorial collection mapping definitions.
 * Directs category and collection slug parameters from react-router to proper criteria.
 */
const mapSlugToCriteria = (slug: string | undefined) => {
  if (!slug) return { title: "Collections", filterKey: "all", filterType: "all", description: "Explore our peerless jewelry curations." };

  const s = slug.toLowerCase();
  
  // Category maps
  if (s === "rings") return { title: "The Rings", filterKey: "Rings", filterType: "category", description: "Bespoke bands, solitaires, and eternity rings crafted in 18k gold and platinum." };
  if (s === "necklaces") return { title: "The Necklaces", filterKey: "Necklaces", filterType: "category", description: "Luminous pendants, chokers, and rivières that capture and refract natural light." };
  if (s === "earrings") return { title: "The Earrings", filterKey: "Earrings", filterType: "category", description: "Elegant hoops, drops, and studs crafted with rare gems and diamonds." };
  if (s === "bracelets") return { title: "The Bracelets", filterKey: "Bracelets", filterType: "category", description: "Artistic bangles, cuffs, and tennis bracelets made for fluid modern luxury." };
  
  // Collection maps
  if (s === "high-jewelry") return { title: "High Jewelry", filterKey: "High Jewelry", filterType: "collection", description: "One-of-a-kind wearable masterpieces showcasing the heights of our design and rare gemstones." };
  if (s === "fine-jewelry") return { title: "Fine Jewelry", filterKey: "Fine Jewelry", filterType: "collection", description: "Everyday treasures in 18k yellow, white, and rose gold with brilliant-cut diamonds." };
  if (s === "bridal" || s === "engagement") return { title: "Engagement & Bridal", filterKey: "Engagement & Bridal", filterType: "collection", description: "Handcrafted engagement rings and wedding bands celebrating eternal romance." };
  if (s === "timepieces" || s === "watches") return { title: "Fine Timepieces", filterKey: "Timepieces", filterType: "collection", description: "Swiss-made automatic horology combining mechanical perfection with fine jewelry design." };
  if (s === "maison" || s === "maison-collections") return { title: "Maison Collections", filterKey: "Maison Collections", filterType: "collection", description: "Signature lines representing our artistic heritage and sculpted craftsmanship." };

  return { title: "The Collections", filterKey: "all", filterType: "all", description: "Peerless fine jewelry, bridal sets, and timepieces expressing our artistic heritage." };
};

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const criteria = mapSlugToCriteria(slug)

  // Consume state-synced custom hook
  const {
    categories,
    materials,
    gemstones,
    minPrice,
    maxPrice,
    sortBy,
    queryArgs,
    toggleCategory,
    toggleMaterial,
    toggleGemstone,
    setPriceRange,
    setSort,
    setPage,
    clearAllFilters,
    activeFiltersCount,
  } = useProductFilters()

  // Merge static route rules with dynamic user filters
  const finalQueryArgs = { ...queryArgs }
  if (criteria.filterType === "category") {
    finalQueryArgs.category = [criteria.filterKey];
  } else if (criteria.filterType === "collection") {
    if (criteria.filterKey === "Timepieces") {
      finalQueryArgs.collection = "Timepieces";
      finalQueryArgs.category = ["Watches"];
    } else {
      finalQueryArgs.collection = criteria.filterKey;
    }
  }

  // Execute caching fetch via RTK Query
  const { data, isLoading, isFetching } = useGetFilteredProductsQuery(finalQueryArgs)

  const isCategoryPage = criteria.filterType === "category" || criteria.filterKey === "Timepieces"

  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* BREADCRUMB */}
        <nav className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors duration-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{criteria.title}</span>
        </nav>

        {/* HERO HEADER */}
        <div className="border-b border-border pb-12 mb-12">
          <SectionHeading
            title={criteria.title}
            eyebrow={criteria.filterType === "category" ? "The Category Collection" : "The Curated Exhibition"}
            align="left"
            className="mb-4"
          />
          <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-2xl">
            {criteria.description}
          </p>
        </div>

        {/* CONTROLS BAR: Sort & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Mobile Filter Button */}
          <div className="sm:hidden flex items-center justify-between w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] tracking-widest relative">
                  <SlidersHorizontal className="h-3.5 w-3.5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[9px] font-sans font-semibold rounded-full h-5 w-5 flex items-center justify-center border border-background animate-pulse">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground p-8 overflow-y-auto w-[320px]">
                <SheetHeader className="border-b border-border pb-4 mb-6">
                  <SheetTitle className="text-sm font-sans tracking-widest uppercase">Select Filters</SheetTitle>
                </SheetHeader>
                <ProductFilters
                  categories={categories}
                  materials={materials}
                  gemstones={gemstones}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  toggleCategory={toggleCategory}
                  toggleMaterial={toggleMaterial}
                  toggleGemstone={toggleGemstone}
                  setPriceRange={setPriceRange}
                  clearAllFilters={clearAllFilters}
                  hideCategory={isCategoryPage}
                />
              </SheetContent>
            </Sheet>

            <span className="text-[10px] font-sans text-muted-foreground tracking-widest uppercase">
              {isLoading || isFetching ? "Loading..." : `${data?.totalCount || 0} Pieces`}
            </span>
          </div>

          {/* Desktop Product Count */}
          <div className="hidden sm:block">
            <span className="text-xs font-sans text-muted-foreground tracking-widest uppercase">
              {isLoading || isFetching
                ? "Securing boutique pieces..."
                : `Showing ${data?.products.length || 0} of ${data?.totalCount || 0} exquisite pieces`}
            </span>
          </div>

          {/* Right Sort Selector */}
          <div className="ml-auto flex items-center gap-4">
            <SortDropdown sortBy={sortBy} setSort={setSort} />
          </div>
        </div>

        {/* TWO COLUMN GRID / SIDEBAR LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-36 h-fit max-h-[calc(100vh-160px)] overflow-y-auto pr-4 scrollbar-thin">
            <ProductFilters
              categories={categories}
              materials={materials}
              gemstones={gemstones}
              minPrice={minPrice}
              maxPrice={maxPrice}
              toggleCategory={toggleCategory}
              toggleMaterial={toggleMaterial}
              toggleGemstone={toggleGemstone}
              setPriceRange={setPriceRange}
              clearAllFilters={clearAllFilters}
              hideCategory={isCategoryPage}
            />
          </aside>

          {/* Right Catalog Grid & Pagination */}
          <main className="lg:col-span-9 flex flex-col justify-between">
            <div className={isFetching && !isLoading ? "opacity-60 duration-300" : ""}>
              <ProductGrid
                products={data?.products}
                isLoading={isLoading}
                clearAllFilters={clearAllFilters}
              />
            </div>

            <Pagination
              currentPage={data?.currentPage || 1}
              totalPages={data?.totalPages || 1}
              onPageChange={setPage}
            />
          </main>

        </div>

      </div>
    </div>
  )
}