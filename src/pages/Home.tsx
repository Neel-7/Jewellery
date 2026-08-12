import * as React from "react";
import { useGetProductsQuery } from "@/features/products/api/productsApi";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BRAND_TAGLINE } from "@/lib/constants";
import type { Product } from "@/types";

export const Home: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const handleAddToCart = (product: Product) => {
    alert(`Added "${product.name}" to cart (scaffold callback).`);
  };

  const handleAddToWishlist = (product: Product) => {
    alert(`Added "${product.name}" to wishlist (scaffold callback).`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        {/* Full bleed dark image representing rich craft */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=90"
            alt="Maison Aurelia Hero Craft"
            className="h-full w-full object-cover opacity-60 transition-transform duration-1000 ease-out scale-105 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>

        {/* Narrative typography overlay */}
        <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
          <span className="text-xs sm:text-sm font-sans tracking-widest uppercase text-white/80 mb-4 reveal-on-scroll">
            {BRAND_TAGLINE}
          </span>
          <h1 className="text-4xl sm:text-7xl font-display font-light text-white mb-8 tracking-wide leading-tight reveal-on-scroll">
            artistry in every <br />
            <span className="italic font-normal font-display">
              brilliant facet
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 reveal-on-scroll">
            <Button
              variant="accent"
              size="lg"
              className="text-white hover:text-foreground"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight - 80,
                  behavior: "smooth",
                })
              }
            >
              Discover The Catalog
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black hover:border-white"
            >
              The Bridal Atelier
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-sans tracking-widest uppercase flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. STORYTELLING EDITORIAL BLOCK (Gucci / Sabyasachi style) */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center">
            {/* Split Left: Large Story Photo */}
            <div className="lg:col-span-7 aspect-[4/5] w-full overflow-hidden bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80"
                alt="Editorial Craftsmanship Story"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Split Right: Story copy */}
            <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8 max-w-lg">
              <span className="text-xs font-sans tracking-widest uppercase text-accent">
                The Heritage
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-light text-foreground leading-tight">
                sculpted by <br />
                <span className="italic font-display font-normal">
                  hand & heritage
                </span>
              </h2>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                For a century, Maison Aurélia has crafted one-of-a-kind
                masterpieces that bridge the gap between classical artistry and
                modern architectural geometry. Every gem is hand-selected by our
                master gemologists for exceptional character, depth, and spirit.
              </p>
              <div className="pt-2">
                <Button variant="editorialLink" size="sm" className="text-sm">
                  Our Centennial Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID SECTION */}
      <section className="py-24 bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 sm:px-8">
          {/* Section Heading */}
          <SectionHeading
            title="The Maison Masterpieces"
            eyebrow="Signature Curations"
            ctaHref="/collections/all"
            ctaLabel="View Entire Catalog"
          />

          {/* Catalog Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-1/3 animate-pulse" />
                  <Skeleton className="h-6 w-2/3 animate-pulse" />
                  <Skeleton className="h-4 w-1/4 animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-sm text-destructive font-sans">
              Failed to load signature masterpieces. Please try refreshing.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. HERITAGE EDITORIAL SPREAD */}
      <section className="py-32 sm:py-40 bg-background text-center">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <p className="text-lg sm:text-2xl font-display font-light italic leading-relaxed text-foreground/90">
            "A diamond is not merely an ornament. It is a vessel of light,
            sculpted by centuries of earthly pressure and refined by the hand of
            the artist to reflect the infinite beauty of the soul."
          </p>
          <span className="block mt-6 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-accent">
            — Aurelia de valois, founder
          </span>
        </div>
      </section>
    </div>
  );
};
