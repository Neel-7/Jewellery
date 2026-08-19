import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Layout - Global layout wrapper for Labonno.
 * Holds persistent components like Header and Footer, handles smooth scroll-to-top on route changes.
 */
export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll window back to top on route transition
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
