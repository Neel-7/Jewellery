/**
 * Navigation configuration and typed schema for Labonno.
 * Defines categories, sub-categories, and image thumbnails for the mega-menu and mobile navigation.
 */

export interface SubCategoryLink {
  name: string;
  href: string;
}

export interface NavImageThumbnail {
  imageUrl: string;
  caption: string;
  href: string;
}

export interface NavigationCategory {
  name: string;
  href: string;
  subCategories: SubCategoryLink[];
  thumbnails: NavImageThumbnail[];
}

export const NAVIGATION_CATEGORIES: NavigationCategory[] = [
  {
    name: "Rings",
    href: "/collections/rings",
    subCategories: [
      { name: "Engagement", href: "/collections/rings?gemstone=Diamond" },
      { name: "Wedding Bands", href: "/collections/rings?material=Gold" },
      { name: "Statement Rings", href: "/collections/rings?gemstone=Sapphire" },
      {
        name: "Stackable Rings",
        href: "/collections/rings?material=Rose+Gold",
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Solitaire Collection",
        href: "/collections/rings?gemstone=Diamond",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80",
        caption: "Bespoke Bands",
        href: "/collections/rings?material=Platinum",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Aura Statement Rings",
        href: "/collections/rings?gemstone=Sapphire",
      },
    ],
  },
  {
    name: "Necklaces",
    href: "/collections/necklaces",
    subCategories: [
      {
        name: "Pendants & Chokers",
        href: "/collections/necklaces?material=Gold",
      },
      {
        name: "Diamond Necklaces",
        href: "/collections/necklaces?gemstone=Diamond",
      },
      {
        name: "Pearls & Gemstones",
        href: "/collections/necklaces?gemstone=Pearl",
      },
      {
        name: "Luminous Riviera",
        href: "/collections/necklaces?material=Platinum",
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
        caption: "Luminous Chains",
        href: "/collections/necklaces?material=Gold",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80",
        caption: "Pearl Masterpieces",
        href: "/collections/necklaces?gemstone=Pearl",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1512540315028-2c1a6497da04?auto=format&fit=crop&w=400&q=80",
        caption: "Diamond Chokers",
        href: "/collections/necklaces?gemstone=Diamond",
      },
    ],
  },
  {
    name: "Earrings",
    href: "/collections/earrings",
    subCategories: [
      { name: "Diamond Studs", href: "/collections/earrings?gemstone=Diamond" },
      { name: "Drop Earrings", href: "/collections/earrings?material=Gold" },
      { name: "Hoop Earrings", href: "/collections/earrings?material=Silver" },
      {
        name: "Chandelier Drops",
        href: "/collections/earrings?gemstone=Sapphire",
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80",
        caption: "Diamond Cascades",
        href: "/collections/earrings?gemstone=Diamond",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
        caption: "Classic Studs",
        href: "/collections/earrings?material=Gold",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=400&q=80",
        caption: "Aurelia Hoops",
        href: "/collections/earrings?material=Silver",
      },
    ],
  },
  {
    name: "Bracelets",
    href: "/collections/bracelets",
    subCategories: [
      { name: "Cuffs & Bangles", href: "/collections/bracelets?material=Gold" },
      {
        name: "Tennis Bracelets",
        href: "/collections/bracelets?gemstone=Diamond",
      },
      { name: "Chain & Link", href: "/collections/bracelets?material=Silver" },
      {
        name: "Signature Cuffs",
        href: "/collections/bracelets?gemstone=Emerald",
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
        caption: "Emerald Chevron",
        href: "/collections/bracelets?gemstone=Emerald",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
        caption: "Tennis Collection",
        href: "/collections/bracelets?gemstone=Diamond",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80",
        caption: "Gold Bangles",
        href: "/collections/bracelets?material=Gold",
      },
    ],
  },
  {
    name: "Watches",
    href: "/collections/watches",
    subCategories: [
      { name: "Automatic Swiss", href: "/collections/watches?material=Gold" },
      { name: "Chronographs", href: "/collections/watches?material=Rose+Gold" },
      {
        name: "Jeweled Timepieces",
        href: "/collections/watches?gemstone=Diamond",
      },
      {
        name: "Classic Collection",
        href: "/collections/watches?material=Platinum",
      },
    ],
    thumbnails: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
        caption: "Sovereign Automatic",
        href: "/collections/watches?material=Gold",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=400&q=80",
        caption: "Swiss Excellence",
        href: "/collections/watches?material=Platinum",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80",
        caption: "Labonno Chronographs",
        href: "/collections/watches?material=Rose+Gold",
      },
    ],
  },
];
