import * as React from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/formatCurrency";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsGridProps {
  products: Product[];
  isFetching: boolean;
  query: string;
  onItemClick?: () => void;
  renderEmptyStateAndSpotlight?: () => React.ReactNode;
  isTakeover?: boolean;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  products,
  isFetching,
  query,
  onItemClick,
  renderEmptyStateAndSpotlight,
  isTakeover = false,
}) => {
  if (isFetching) {
    return (
      <div className="max-w-6xl mx-auto mt-8 w-full px-4 sm:px-6">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          data-testid="search-loading"
        >
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col gap-3">
              <Skeleton className="aspect-[3/4] w-full rounded-none bg-secondary/40" />
              <Skeleton className="h-4 w-3/4 bg-secondary/40 mt-2" />
              <Skeleton className="h-3 w-1/2 bg-secondary/40" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (query.trim().length >= 2 && products.length === 0) {
    return renderEmptyStateAndSpotlight ? (
      <>{renderEmptyStateAndSpotlight()}</>
    ) : (
      <div className="max-w-6xl mx-auto mt-12 text-center w-full px-4 sm:px-6">
        <p className="font-serif text-base italic text-muted-foreground">
          No pieces found matching &ldquo;{query}&rdquo;
        </p>
      </div>
    );
  }

  if (query.trim().length < 2) {
    return null;
  }

  const displayedProducts = isTakeover ? products.slice(0, 8) : products;
  const hasMore = isTakeover && products.length > 8;

  return (
    <div className="max-w-6xl mx-auto mt-8 w-full px-4 sm:px-6">
      <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest mb-6 text-center sm:text-left">
        {products.length} {products.length === 1 ? "piece" : "pieces"} found for
        &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {displayedProducts.map((product) => {
          const primaryImage = product.images[0];
          return (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              onClick={onItemClick}
              className="group flex flex-col focus:outline-none"
            >
              <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden border border-border/20">
                <img
                  src={primaryImage?.url}
                  alt={primaryImage?.altText || product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex flex-col text-center sm:text-left">
                <h4 className="font-serif text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate">
                  {product.name}
                </h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {product.collection}
                </p>
                <p className="text-xs font-serif font-semibold text-foreground mt-1">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12 mb-8 w-full">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            onClick={onItemClick}
            className="inline-flex h-11 items-center justify-center border border-primary bg-transparent px-4 sm:px-8 text-[11px] sm:text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground text-foreground hover:no-underline whitespace-nowrap text-center"
          >
            View all results ({products.length})
          </Link>
        </div>
      )}
    </div>
  );
};
