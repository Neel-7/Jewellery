import * as React from "react";
import { User, ShoppingBag, Settings, Lock, MapPin } from "lucide-react";

export type SidebarTab = "home" | "orders" | "profile" | "password" | "addresses";

interface AccountSidebarProps {
  activeTab: SidebarTab;
  onChangeTab?: (tab: SidebarTab) => void;
}

interface MenuItem {
  id: SidebarTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "home", label: "Account Home", icon: User },
  { id: "orders", label: "Order History", icon: ShoppingBag },
  { id: "profile", label: "Profile Information", icon: Settings },
  { id: "password", label: "Security & Password", icon: Lock },
  { id: "addresses", label: "Address Book", icon: MapPin },
];

/**
 * AccountSidebar - Editorial navigation panel for the boutique member portal.
 * Stacks as a vertical panel on desktop (lg:) and transitions into a horizontal scrollbar on mobile/tablets.
 */
export const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="w-full">
      {/* 
        Responsive layout wrapper:
        - Mobile & Tablet (< lg): horizontal scroll, thin border-b, no border-r
        - Desktop (>= lg): vertical column, border-r, no border-b
      */}
      <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-border pb-0 lg:pb-8 lg:pr-8 gap-1 lg:gap-2 no-scrollbar whitespace-nowrap">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab?.(item.id)}
              className={`
                flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-4 border-b-2 lg:border-b-0 lg:border-l-2 text-xs font-sans uppercase tracking-widest transition-all duration-300 relative cursor-pointer
                ${
                  isActive
                    ? "border-accent text-accent bg-secondary/30 font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
