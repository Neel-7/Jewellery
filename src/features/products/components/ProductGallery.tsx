import * as React from "react"
import type { Media } from "@/types"
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
  const [isFullscreenOpen, setIsFullscreenOpen] = React.useState(false);

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

  const handlePrev = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, [galleryImages.length]);

  const handleNext = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, [galleryImages.length]);

  // Keyboard support for fullscreen gallery cycling
  React.useEffect(() => {
    if (!isFullscreenOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreenOpen, handlePrev, handleNext]);

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
              className={`relative aspect-[3/4] w-20 border transition-all duration-300 rounded-none ${
                isActive ? "border-primary ring-1 ring-primary" : "border-border hover:border-muted-foreground"
              }`}
              aria-label={`View image ${index + 1}`}
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

      {/* 2. MAIN ENLARGED IMAGE WITH HOVER ZOOM & EXPAND TRIGGER */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFullscreenOpen(true)}
        className="relative aspect-[3/4] flex-grow overflow-hidden bg-secondary border border-border cursor-zoom-in group"
      >
        <img
          src={activeImage.url}
          alt={activeImage.altText || "Main Piece View"}
          style={zoomStyle}
          className="h-full w-full object-cover transition-transform duration-200 ease-out"
          loading="eager"
        />

        {/* Zoom Trigger Affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreenOpen(true);
          }}
          className="absolute right-4 bottom-4 z-10 p-3 bg-background/80 hover:bg-background text-foreground hover:text-accent border border-border transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-none"
          aria-label="View fullscreen image gallery"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* 3. FULLSCREEN RADIX DIALOG MODAL */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] sm:max-w-[95vw] sm:max-h-[95vh] p-0 border-none bg-background/95 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-50 p-3 bg-background/60 hover:bg-background text-foreground hover:text-accent transition-all duration-300 border border-border rounded-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Display Viewport */}
            <div className="relative aspect-[3/4] max-w-full max-h-full p-4 flex flex-col items-center justify-center">
              <img
                src={activeImage.url}
                alt={activeImage.altText || "Enlarged view"}
                className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain select-none"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-sans tracking-widest uppercase text-muted-foreground select-none">
                {activeIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-50 p-3 bg-background/60 hover:bg-background text-foreground hover:text-accent transition-all duration-300 border border-border rounded-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};