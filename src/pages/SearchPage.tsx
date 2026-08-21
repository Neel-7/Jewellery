import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { openSearch, closeSearch } from "@/app/uiSlice";
import { useSearchProductsQuery } from "@/features/products/api/productsApi";
import { SearchResultsGrid } from "@/features/products/components/SearchResultsGrid";
import { SearchSpotlight } from "@/features/products/components/SearchSpotlight";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/input";
import { NAVIGATION_CATEGORIES } from "@/features/navigation/navConfig";

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const skipQuery = query.trim().length < 2;
  const { data, isFetching } = useSearchProductsQuery(
    { q: query },
    { skip: skipQuery },
  );

  const products = data?.data || [];
  const isQueryActive = query.trim().length >= 2;

  const handleInputTrigger = (e: React.MouseEvent | React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openSearch());
  };

  const handleItemClick = () => {
    dispatch(closeSearch());
  };

  // Truncate long search query strings to prevent breaking the SectionHeading container layout
  const displayQuery =
    query.length > 25 ? `${query.substring(0, 25)}...` : query;

  const renderEmptyStateAndSpotlight = () => (
    <div className="max-w-6xl mx-auto text-center mt-12 w-full px-4 sm:px-6">
      <p className="font-serif text-base italic text-muted-foreground">
        No pieces found matching &ldquo;{query}&rdquo; &mdash; explore the
        collections below
      </p>
      <SearchSpotlight onItemClick={handleItemClick} />
    </div>
  );

  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeading
          title={
            isQueryActive
              ? `Results for "${displayQuery}"`
              : "Search The Catalog"
          }
          align="center"
          className="mb-8"
        />

        {/* Elegant Search Input on Page - Clicking / focusing opens the Takeover */}
        <div className="flex items-end gap-3 border-b border-foreground/30 pb-3 md:pb-4 max-w-4xl mx-auto mt-6 w-full">
          <Search className="h-5 w-5 text-foreground/70 flex-shrink-0 mb-1" />
          <Input
            value={query}
            readOnly
            onClick={handleInputTrigger}
            onFocus={handleInputTrigger}
            placeholder="Search rings, necklaces, gemstones..."
            className="flex-grow border-b-0 focus:border-b-0 focus:outline-none focus:ring-0 h-auto py-0 text-base sm:text-lg md:text-xl font-serif italic bg-transparent placeholder:text-muted-foreground/30 text-foreground placeholder:text-base sm:placeholder:text-lg md:placeholder:text-xl cursor-pointer"
          />
        </div>

        {/* Idle State: Popular Searches & Spotlight */}
        {!isQueryActive && (
          <div className="mt-8">
            {/* Popular Searches */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-8 w-full mb-12">
              <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-muted-foreground flex-shrink-0 text-center sm:text-left">
                Popular Searches
              </span>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                {NAVIGATION_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={handleInputTrigger}
                    className="text-base font-serif text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1 group focus:outline-none focus:ring-0 active:outline-none active:ring-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer"
                  >
                    {cat.name}
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Spotlight Grid */}
            <SearchSpotlight onItemClick={handleItemClick} />
          </div>
        )}

        {/* Active Results Grid */}
        {isQueryActive && (
          <SearchResultsGrid
            products={products}
            isFetching={isFetching}
            query={query}
            onItemClick={handleItemClick}
            renderEmptyStateAndSpotlight={renderEmptyStateAndSpotlight}
            isTakeover={false}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
