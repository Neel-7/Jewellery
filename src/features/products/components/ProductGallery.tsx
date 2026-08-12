import * as React from "react"
import type { Media } from "@/types"

interface ProductGalleryProps {
  images: Media[]
}

/**
 * ProductGallery - Tactile image viewer with mouse hover-zoom.
 * Renders thumbnail strips (vertical on desktop, horizontal on mobile) and computed hover zoom.
 */
export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  // Gracefully handle missing or scarce image arrays
  const galleryImages = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    if (images.length === 1) return [images[0], images[0], images[0]];
    if (images.length === 2) return [images[0], images[1], images[0]];
    return images;
  }, [images]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [zoomStyle, setZoomStyle] = React.useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const activeImage = galleryImages[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.7)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  if (galleryImages.length === 0) {
    return <div className="aspect-[3/4] bg-secondary animate-pulse" />;
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      
      {/* 1. THUMBNAILS STRIP */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 shrink-0 scrollbar-none pb-2 lg:pb-0">
        {galleryImages.map((img, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[3/4] w-20 border transition-all duration-300 ${
                isActive ? "border-primary ring-1 ring-primary" : "border-border hover:border-muted-foreground"
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* 2. MAIN ENLARGED IMAGE WITH HOVER ZOOM */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[3/4] flex-grow overflow-hidden bg-secondary border border-border cursor-zoom-in"
      >
        <img
          src={activeImage.url}
          alt={activeImage.altText || "Main Piece View"}
          style={zoomStyle}
          className="h-full w-full object-cover transition-transform duration-200 ease-out"
          loading="eager"
        />
      </div>

    </div>
  );
};