import * as React from "react";
import { NAVIGATION_CATEGORIES } from "@/features/navigation/navConfig";
import { CuratedCard } from "./CuratedCard";

interface SearchSpotlightProps {
  onItemClick: () => void;
}

export const SearchSpotlight: React.FC<SearchSpotlightProps> = ({
  onItemClick,
}) => {
  const spotlightItems = React.useMemo(() => {
    const items = [];
    const ringThumb = NAVIGATION_CATEGORIES.find((c) => c.name === "Rings")
      ?.thumbnails[0];
    if (ringThumb) {
      items.push({
        imageUrl: ringThumb.imageUrl,
        caption: "Bridal Selection",
        href: "/collections/rings?collection=Engagement+%26+Bridal",
      });
    }

    const necklaceThumb = NAVIGATION_CATEGORIES.find(
      (c) => c.name === "Necklaces",
    )?.thumbnails[1];
    if (necklaceThumb) {
      items.push({
        imageUrl: necklaceThumb.imageUrl,
        caption: "High Jewelry",
        href: "/collections/necklaces?collection=High+Jewelry",
      });
    }

    const watchThumb = NAVIGATION_CATEGORIES.find((c) => c.name === "Watches")
      ?.thumbnails[1];
    if (watchThumb) {
      items.push({
        imageUrl: watchThumb.imageUrl,
        caption: "Swiss Excellence",
        href: "/collections/watches",
      });
    }

    return items;
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-16 w-full">
      <p className="text-[11px] font-sans tracking-[0.15em] uppercase text-muted-foreground mb-6 text-center sm:text-left">
        Featured Spotlight
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {spotlightItems.map((item) => (
          <CuratedCard
            key={item.caption}
            imageUrl={item.imageUrl}
            caption={item.caption}
            href={item.href}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};
