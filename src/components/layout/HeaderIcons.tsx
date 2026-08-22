import * as React from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, User, Heart, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectWishlistTotalQuantity } from "@/features/wishlist/wishlistSlice";
import { openSearch } from "@/app/uiSlice";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

export const LeftIcons: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-4 text-current">
      <button
        onClick={() => {
          dispatch(openSearch());
        }}
        className="p-1.5 hover:text-accent duration-300 transition-colors"
        aria-label="Search Catalog"
      >
        <Search className="h-4 sm:h-5 w-4 sm:w-5" />
      </button>
      <Link
        to="/collections/labonno"
        className="p-1.5 hover:text-accent duration-300 transition-colors hidden sm:inline-block"
        aria-label="Boutique Locator"
      >
        <MapPin className="h-4 sm:h-5 w-4 sm:w-5" />
      </Link>
    </div>
  );
};

export const RightIcons: React.FC = () => {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistTotalQuantity = useAppSelector(selectWishlistTotalQuantity);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div className="flex items-center gap-2 sm:gap-4 text-current">
      <Link
        to={isAuthenticated ? "/account" : "/login"}
        className="p-1.5 hover:text-accent duration-300 transition-colors hidden md:inline-block"
        aria-label={isAuthenticated ? "Boutique Account" : "Boutique Sign In"}
      >
        <User className="h-4 sm:h-5 w-4 sm:w-5" />
      </Link>
      <Link
        to="/wishlist"
        className="p-1.5 hover:text-accent duration-300 transition-colors relative"
        aria-label="Wishlist"
      >
        <Heart className="h-4 sm:h-5 w-4 sm:w-5" />
        {wishlistTotalQuantity > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[8px] font-sans font-semibold rounded-full h-4 w-4 flex items-center justify-center border border-background">
            {wishlistTotalQuantity}
          </span>
        )}
      </Link>
      <Link
        to="/cart"
        className="p-1.5 hover:text-accent duration-300 transition-colors relative"
        aria-label="Shopping Bag"
      >
        <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
        {totalQuantity > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[8px] font-sans font-semibold rounded-full h-4 w-4 flex items-center justify-center border border-background">
            {totalQuantity}
          </span>
        )}
      </Link>
    </div>
  );
};
