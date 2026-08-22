import * as React from "react";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AccountSidebar, type SidebarTab } from "@/features/account/components/AccountSidebar";
import { ProfileSummary } from "@/features/account/components/ProfileSummary";
import { ShoppingBag, Settings, Lock, MapPin, User } from "lucide-react";

/**
 * AccountPage - Premium boutique member portal.
 * Orchestrates an editorial sidebar navigation and right-hand profile summary block.
 * Fully responsive: sidebar collapses to horizontal scrolling tabs on mobile/tablet and matches lg: grid.
 */
export const AccountPage: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = React.useState<SidebarTab>("home");

  const renderComingSoon = (tab: SidebarTab) => {
    const tabConfig = {
      orders: {
        title: "Order History",
        description: "Our master archive is compiling your historical orders. Your boutique purchasing ledger will appear here shortly.",
        icon: ShoppingBag,
      },
      profile: {
        title: "Profile Information",
        description: "Custom profile modification forms, contact parameters, and preferences are being structured for your convenience.",
        icon: Settings,
      },
      password: {
        title: "Security & Password",
        description: "Secure multi-factor authentication locks and credential modifications are currently being configured by our safety architects.",
        icon: Lock,
      },
      addresses: {
        title: "Address Book",
        description: "Your digital address registry for delivery, bespoke sizing records, and custom boutiques is being integrated.",
        icon: MapPin,
      },
      home: {
        title: "Account Home",
        description: "",
        icon: User,
      }
    };

    const config = tabConfig[tab] || tabConfig.orders;
    const Icon = config.icon;

    return (
      <div className="py-12 flex flex-col items-center justify-center text-center max-w-md mx-auto select-none">
        <div className="p-5 bg-secondary/50 rounded-none mb-6 text-muted-foreground">
          <Icon className="h-8 w-8 stroke-[1.25]" />
        </div>
        <h3 className="font-display text-xl font-light text-foreground mb-3 uppercase tracking-wider">
          {config.title}
        </h3>
        <p className="text-xs font-sans text-muted-foreground leading-relaxed">
          {config.description}
        </p>
        <div className="mt-8 border-t border-border w-24 pt-4 text-[10px] font-sans text-accent uppercase tracking-widest italic">
          Coming Soon
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 sm:pt-36 pb-24 bg-[#faf9f5] min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Editorial Eyebrow & Page Header */}
        <div className="border-b border-border pb-8 mb-12">
          <SectionHeading
            title="Boutique Member Portal"
            eyebrow="My Account"
            align="left"
          />
        </div>

        {/* TWO-COLUMN GRID SPREAD (Aligned grid collapse transition to lg:) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Responsive Sidebar Nav */}
          <div className="lg:col-span-3">
            <AccountSidebar activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>

          {/* Right Column: Content Summary Canvas */}
          <div className="lg:col-span-9 bg-card border border-border p-8 md:p-12 shadow-sm rounded-none min-h-[400px]">
            {activeTab === "home" && currentUser ? (
              <ProfileSummary user={currentUser} />
            ) : (
              renderComingSoon(activeTab)
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
