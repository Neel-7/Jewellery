import * as React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Compass,
  ArrowRight,
} from "lucide-react";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  BOUTIQUE_HOURS,
} from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Newsletter Circle",
      description: "Thank you for joining our private newsletter circle.",
      variant: "success",
    });
  };

  return (
    <footer className="bg-secondary text-foreground pt-20 pb-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Top: 4 Columns + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Brand & Concierge */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <Link
                to="/"
                className="text-xl font-display font-light tracking-luxury uppercase"
              >
                {BRAND_NAME}
              </Link>
              <p className="mt-4 text-xs font-sans text-muted-foreground leading-relaxed max-w-sm">
                Crafting peerless high jewelry, bespoke bridal sets, and fine
                swiss timepieces with timeless artistic heritage since 1926.
              </p>
            </div>
            <div className="text-[11px] font-sans text-muted-foreground leading-relaxed space-y-1">
              <p className="font-semibold uppercase tracking-widest text-foreground">
                The Labonno Concierge
              </p>
              <p>{CONTACT_PHONE}</p>
              <p>{CONTACT_EMAIL}</p>
              <p>{BOUTIQUE_HOURS}</p>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-luxury text-foreground">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-muted-foreground">
              <li>
                <Link
                  to="/collections/high-jewelry"
                  className="hover:text-accent transition-colors"
                >
                  High Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/fine-jewelry"
                  className="hover:text-accent transition-colors"
                >
                  Fine Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/bridal"
                  className="hover:text-accent transition-colors"
                >
                  Bridal & Engagement
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/timepieces"
                  className="hover:text-accent transition-colors"
                >
                  Fine Timepieces
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-luxury text-foreground">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-muted-foreground">
              <li>
                <a
                  href="#boutique-appointments"
                  className="hover:text-accent transition-colors"
                >
                  Book an Appointment
                </a>
              </li>
              <li>
                <a
                  href="#care-instructions"
                  className="hover:text-accent transition-colors"
                >
                  Jewelry Care & Service
                </a>
              </li>
              <li>
                <a
                  href="#shipping-returns"
                  className="hover:text-accent transition-colors"
                >
                  Bespoke Fitting & Sizing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors">
                  Shipping, Duty & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div className="flex flex-col space-y-4 lg:col-span-1">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-luxury text-foreground">
              Newsletter
            </h4>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              Subscribe to receive private invitations to new collections and
              exhibitions.
            </p>
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center mt-2"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full text-xs font-sans"
              />
              <button
                type="submit"
                className="absolute right-0 p-2 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Submit newsletter"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle: Separator */}
        <div className="h-[1px] bg-border w-full mb-8" />

        {/* Bottom: Social + Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#instagram"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#facebook"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#twitter"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#boutiques"
              className="p-2 text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
              aria-label="Boutique Finder"
            >
              <Compass className="h-4 w-4" />
              <span className="text-[10px] font-sans uppercase tracking-widest hidden sm:inline">
                Our Boutiques
              </span>
            </a>
          </div>

          <div className="text-[10px] font-sans text-muted-foreground tracking-wider uppercase space-x-6">
            <a
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Use
            </a>
            <span className="inline-block pt-2 sm:pt-0">
              © {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
