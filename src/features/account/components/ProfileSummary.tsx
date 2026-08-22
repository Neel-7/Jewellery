import * as React from "react";
import { useAppDispatch } from "@/app/hooks";
import { logout, type AuthUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LogOut, Calendar, ShieldCheck, Mail, User } from "lucide-react";

interface ProfileSummaryProps {
  user: AuthUser;
}

/**
 * ProfileSummary - Renders the premium, editorial summary of the logged-in user profile.
 * Incorporates a layout utilizing sharp borders, extensive white spaces, and clear labels.
 * Dispatches the existing `logout` action to sign out from the boutique portal.
 */
export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out of your boutique session.",
      variant: "success",
    });
    navigate("/");
  };

  // Format creation date beautifully into luxury-standard date strings
  const joinDate = React.useMemo(() => {
    try {
      return new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Centennial Member";
    }
  }, [user.createdAt]);

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-display font-light text-foreground uppercase tracking-wider">
          My Account
        </h2>
        <p className="text-xs sm:text-sm font-sans text-accent tracking-widest uppercase font-medium">
          {user.name}
        </p>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed max-w-xl pt-2">
          Here inside your private boutique locker, you can view your personal curations,
          manage security, and view membership credentials.
        </p>
      </div>

      {/* Profile Details Card Stack (Easily replaced with API payload later) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
        
        {/* Name Block */}
        <div className="border border-border p-6 flex items-start gap-4 bg-[#fdfbf7]">
          <div className="p-2.5 bg-secondary/50 rounded-none text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
              Full Name
            </span>
            {/* Future Real API Note: Map directly to user.firstName + user.lastName */}
            <p className="text-sm font-sans font-medium text-foreground">{user.name}</p>
          </div>
        </div>

        {/* Email Block */}
        <div className="border border-border p-6 flex items-start gap-4 bg-[#fdfbf7]">
          <div className="p-2.5 bg-secondary/50 rounded-none text-muted-foreground">
            <Mail className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
              Email Address
            </span>
            {/* Future Real API Note: Map directly to user.email */}
            <p className="text-sm font-sans font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
              {user.email}
            </p>
          </div>
        </div>

        {/* Membership Date Block */}
        <div className="border border-border p-6 flex items-start gap-4 bg-[#fdfbf7]">
          <div className="p-2.5 bg-secondary/50 rounded-none text-muted-foreground">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
              Member Since
            </span>
            {/* Future Real API Note: Map directly to user.createdAt */}
            <p className="text-sm font-sans font-medium text-foreground">{joinDate}</p>
          </div>
        </div>

        {/* Client ID Block */}
        <div className="border border-border p-6 flex items-start gap-4 bg-[#fdfbf7]">
          <div className="p-2.5 bg-secondary/50 rounded-none text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="space-y-1 bg-transparent">
            <span className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
              Client Identifier
            </span>
            {/* Future Real API Note: Map directly to user.id or UUID */}
            <p className="text-[11px] font-mono text-muted-foreground break-all">{user.id}</p>
          </div>
        </div>

      </div>

      {/* Out of Scope / Upcoming Features Warning Panels */}
      <div className="border-l-2 border-accent/20 pl-6 py-2 space-y-2">
        <h4 className="text-[11px] font-sans uppercase tracking-widest text-muted-foreground">
          Note from the Atelier
        </h4>
        <p className="text-[11px] font-sans text-muted-foreground/80 leading-relaxed max-w-lg">
          Extended services including Order History tracking, custom delivery addresses, and security credential modification are being configured in upcoming passes and will link automatically.
        </p>
      </div>

      {/* Logout Affordance (Safely moved from header icons) */}
      <div className="pt-8 border-t border-border flex justify-start">
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive text-xs uppercase tracking-widest h-11 px-8 rounded-none gap-2 duration-300 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
