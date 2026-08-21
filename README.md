# Labonno — High-End Luxury E-Commerce Scaffold

Labonno is a production-grade, highly scalable e-commerce frontend architecture for a boutique luxury jewelry brand. It features clean editorial luxury aesthetics, drawing inspiration from **Tiffany & Co.** (generous negative space, centered serif headers, ivory background), **Gucci** (cinematic full-bleed imagery), and **Sabyasachi** (storytelling-driven magazine layouts).

---

## Architectural Guidelines & Design Tokens

### Technical Stack

- **Framework:** React 18 + TypeScript (Strict Mode)
- **State Management:** Redux Toolkit + RTK Query (Caching/API layers)
- **Routing:** React Router v6
- **Component Primitives:** Radix UI + Custom Utility Clones (Shadcn style)
- **Styling:** Tailwind CSS with Custom CSS variables in `globals.css`
- **Schema Validation:** Zod + React Hook Form (installed and ready for future passes)

---

## Folder Structure

The repository uses a **feature-based folder structure** instead of a type-based structure to ensure modularity, feature isolation, and independent ownability of catalog modules.

```
src/
  app/                 # Redux store setup, typed hooks
    store.ts
    hooks.ts
  features/            # Domain-driven features (modularity first)
    products/          # Products catalog domain
      api/             # RTK Query slices
      components/      # Feature-local visual components
      hooks/           # Custom hooks
      types.ts         # Domain types
    cart/                # Cart domain (stubbed)
    wishlist/            # Wishlist domain (stubbed)
    auth/                # Account authorization domain (stubbed)
  components/          # Shareable visual layers
    ui/                # Radical/Shadcn-style styled core primitives (zero border-radius)
    layout/            # Layout shells (Header, Footer, Layout framing)
    shared/            # Cross-feature visual blocks (ProductCard, SectionHeading)
  pages/               # Pure route-level composing elements
    Home.tsx           # Breathtaking cinematic landing page
    CollectionPage.tsx
    ProductDetailPage.tsx
    CartPage.tsx
    NotFound.tsx
  lib/                 # Global utils and constants
    constants.ts       # Brand copy variables
    utils.ts           # Safely merges classes (cn)
    formatCurrency.ts  # Formats raw prices into luxury currency symbols
  styles/
    globals.css        # CSS variable tokens mapped with @fontsource playfair & inter
  types/
    index.ts           # Standard shared interfaces (Product, Media, CartItem, etc.)
  routes/
    router.tsx         # Centralized single-page navigation router skeleton
```

---

## Adding a New Feature Module

To add a new feature (e.g., `checkout` or `reviews`), adhere to the feature isolation architecture:

1. **Create the Feature Folder:**
   Create a new directory inside `src/features/[feature_name]/` containing `components/`, `hooks/`, `api/`, and `types.ts`.

2. **Isolate Domain Logic:**
   - Define localized schemas and types inside `features/[feature_name]/types.ts`.
   - Place API endpoints or state slices in `features/[feature_name]/api/[feature_name]Api.ts` using RTK Query or `createSlice`.

3. **Register Slice in Store:**
   Import and wire the new slice or api reducer into `src/app/store.ts`.

4. **Expose with Barrel Exports:**
   Export public-facing components or hooks through a single `index.ts` file in the feature directory. Avoid cross-importing private folders.

---

## Design System & Tokens

The design tokens are centralized in `src/styles/globals.css` as CSS variables and mapped into `tailwind.config.js`. Use semantic Tailwind classes:

- **Colors:**
  - `bg-background`: Ivory/Alabaster luxury near-white (`#FAF9F5`)
  - `text-foreground`: Charcoal obsidian rich near-black (`#111111`)
  - `text-accent` / `bg-accent`: Sophisticated deep jewel teal (`#0A5C5A`)
  - `border-border`: Light beige-gray for thin separators (`#E5E0D8`)
- **Typography:**
  - `font-display`: Playfair Display Serif for headlines and catalog titles
  - `font-sans`: Inter Sans-serif for navigation, body text, and prices
- **Borders:**
  - Minimal (`0px`) border-radii for sharp, architectural product card borders.

---

## Core Feature Passes

### 1. Product Listing Page (PLP) & Custom Filters

A fully URL-synchronized, responsive catalog rendering ~48 unique pieces from a mock JSON database. Implements custom collapsible Accordion filter sidesteps (material, category, price) and Sort controls.

### 2. Product Detail Page (PDP) & Active Cart Flow

- **ProductGallery:** Main viewport with coordinate-based mouse hover-zoom plus dynamic thumbnail selectors.
- **ProductInfoPanel:** Large serif title formatting, review rating summaries, material badges, and collapsible static luxury Care and Fitting accordions.
- **StickyMobileBar:** Sticky bottom drawer revealed upon downward scrolling, making checkout quick actions continuously reachable on viewports.
- **CartState:** Complete Redux Toolkit reducers (`addItem`, `removeItem`, `updateQuantity`) connected to an active item count badge on the Header utility section.

### 3. Product Variants & Stock Status Enforcement

- **Presentational VariantSelector:** Allows selection of metals/materials (derived from `product.materials`) and ring sizes (static US sizes 4–10 for the "Rings" category) on the PDP. Selection is saved in the local state and correctly bound to `CartItem.selectedVariant` upon adding to basket.
- **Ring Size Caveat:** Because the underlying data model does not support per-variant price/stock schemas, the ring-size selector is purely a **cosmetic/non-authoritative** design experience to reflect luxury catalog interfaces and is documented as such in the interface.
- **Consistent Out-of-Stock Enforcement:**
  - **ProductCard:** Out-of-stock items overlay an "Out of Stock" Badge, and have their "Quick Add" (Desktop) and "Add to Cart" (Mobile) buttons disabled, dimmed to 40% opacity, and set to non-interactive, with their labels updated to "Out of Stock".
  - **ProductInfoPanel (PDP):** Displays an "Out of Stock" Badge adjacent to the product category/title. The quantity stepper is locked, and the "Add to Bag" button is disabled, styled with reduced opacity, and exhibits a static "Out of Stock" indicator.

### 4. PDP Fullscreen Image Gallery

- **Zoom/Fullscreen viewer:** Main preview image inside `ProductGallery.tsx` features an editorial "View fullscreen" button revealed on hover. Clicking the preview image or the hover button opens a sleek, near-fullscreen Radix `Dialog` showing the image at large dimensions.
- **Cyclic navigation:** The fullscreen Dialog features tactile Left and Right arrow navigation buttons that cycle infinitely through the product images.
- **Synchronized selection state:** The fullscreen viewer manipulates the same `activeIndex` state. Thus, clicking through images inside the Dialog and closing it leaves the correct corresponding thumbnail selected and visible on the main page.
- **Keyboard & Accessibility bindings:**
  - Standard Radix Dialog handles closing automatically on **Escape** key down or outside-clicks.
  - Active keyboard listeners bind **ArrowLeft** and **ArrowRight** to change images when the fullscreen modal is open.
  - Controls, triggers, and elements are augmented with semantic `aria-label` annotations for assistive technologies.

---

## Getting Started

Install the workspace dependencies and boot the development boutique server:

```bash
npm install
npm run dev
```

To run a production-ready assets compilation:

```bash
npm run build
```
