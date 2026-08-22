import * as React from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeSearch } from "@/app/uiSlice";
import { useSearchProductsQuery } from "../api/productsApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NAVIGATION_CATEGORIES } from "@/features/navigation/navConfig";
import { SearchSpotlight } from "./SearchSpotlight";
import { SearchResultsGrid } from "./SearchResultsGrid";

export const SearchDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchOpen = useAppSelector((state) => state.ui.searchOpen);
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  const isMouseDownRef = React.useRef(false);
  const [showKeyboardRing, setShowKeyboardRing] = React.useState(false);

  const handleButtonMouseDown = () => {
    isMouseDownRef.current = true;
  };

  const handleButtonFocus = () => {
    if (!isMouseDownRef.current) {
      setShowKeyboardRing(true);
    }
  };

  const handleButtonBlur = () => {
    setShowKeyboardRing(false);
    isMouseDownRef.current = false;
  };

  const handleButtonMouseUp = () => {
    isMouseDownRef.current = false;
  };

  // Sync URL query parameters to search inputs when takeover opens
  React.useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        setSearchTerm(initialQuery);
        setDebouncedQuery(initialQuery);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchOpen, initialQuery]);

  // Debounce the query input (~300ms)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedQuery !== searchTerm) {
        setDebouncedQuery(searchTerm);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debouncedQuery]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeSearch());
      setSearchTerm("");
      setDebouncedQuery("");
    }
  };

  const handleClose = () => {
    dispatch(closeSearch());
    setSearchTerm("");
    setDebouncedQuery("");
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchTerm(term);
    setDebouncedQuery(term);
  };

  const skipQuery = debouncedQuery.length < 2;
  const { data, isFetching } = useSearchProductsQuery(
    { q: debouncedQuery },
    { skip: skipQuery },
  );

  const products = data?.data || [];
  const isQueryActive = debouncedQuery.length >= 2;

  const renderEmptyStateAndSpotlight = () => (
    <div className="max-w-6xl mx-auto text-center mt-12 w-full px-4 sm:px-6">
      <p className="font-serif text-base italic text-muted-foreground">
        No pieces found matching &ldquo;{debouncedQuery}&rdquo; &mdash; explore
        the collections below
      </p>
      <SearchSpotlight onItemClick={handleClose} />
    </div>
  );

  return (
    <Dialog open={searchOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="fixed inset-0 left-0 top-0 translate-x-0 translate-y-0 max-w-none w-screen h-screen border-none bg-[#fdfbf7] p-6 sm:p-12 md:p-16 shadow-none rounded-none overflow-y-auto gap-0 [&_button.absolute.right-4]:hidden flex flex-col justify-start items-stretch focus:outline-none focus:ring-0 transition-all duration-700 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-top-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=closed]:slide-out-to-left-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Takeover</DialogTitle>
          <DialogDescription>
            Full viewport editorial search takeover
          </DialogDescription>
        </DialogHeader>

        {/* Custom luxury Close button top right */}
        <button
          onClick={handleClose}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          onFocus={handleButtonFocus}
          onBlur={handleButtonBlur}
          className={`absolute right-6 top-6 sm:right-12 sm:top-12 md:right-16 md:top-16 text-[11px] font-sans uppercase tracking-[0.15em] text-foreground font-medium hover:text-accent transition-all duration-300 py-1 group focus:outline-none focus:ring-0 active:outline-none active:ring-0 focus-visible:outline-none focus-visible:ring-0 cursor-pointer ${
            showKeyboardRing
              ? "ring-1 ring-accent px-2"
              : "ring-0 outline-none border-none"
          }`}
        >
          Close
          <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus:scale-x-100" />
        </button>

        {/* Large Editorial Search Input Section */}
        <div className="flex items-end gap-3 border-b border-foreground/30 pb-3 md:pb-4 max-w-6xl mx-auto mt-20 sm:mt-24 md:mt-28 w-full">
          <Search className="h-5 w-5 text-foreground/70 flex-shrink-0 mb-1" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rings, necklaces, gemstones..."
            className="flex-grow border-b-0 focus:border-b-0 focus:outline-none focus:ring-0 h-auto py-0 text-base sm:text-lg md:text-xl font-serif italic bg-transparent placeholder:text-muted-foreground/30 text-foreground placeholder:text-base sm:placeholder:text-lg md:placeholder:text-xl"
            autoFocus
          />
        </div>

        {/* Idle State: Popular Searches & Spotlight */}
        {!isQueryActive && (
          <>
            {/* Popular Searches */}
            <div className="max-w-6xl mx-auto mt-8 flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-8 w-full">
              <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-muted-foreground flex-shrink-0 text-center sm:text-left">
                Popular Searches
              </span>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                {NAVIGATION_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handlePopularSearchClick(cat.name)}
                    className="text-base font-serif text-foreground/80 hover:text-foreground transition-all duration-300 relative py-1 group focus:outline-none focus:ring-0 active:outline-none active:ring-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer"
                  >
                    {cat.name}
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus:scale-x-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Spotlight Image Grid */}
            <SearchSpotlight onItemClick={handleClose} />
          </>
        )}

        {/* Active State: Results Grid / Empty state with Spotlight */}
        <SearchResultsGrid
          products={products}
          isFetching={isFetching}
          query={debouncedQuery}
          onItemClick={handleClose}
          renderEmptyStateAndSpotlight={renderEmptyStateAndSpotlight}
          isTakeover={true}
        />
      </DialogContent>
    </Dialog>
  );
};
