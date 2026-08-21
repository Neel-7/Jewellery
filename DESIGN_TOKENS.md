# Labonno Editorial Design Tokens & System Guidelines

This document serves as the single source of truth for the **Labonno** design system, detailing the HSL variables, Tailwind configurations, typography standards, spacing grids, and component variant styling actually implemented inside the codebase.

---

## 1. Color Palette

The color system focuses on high-contrast luxury editorial design, utilizing soft warm white, intense charcoal, and deep gemstone teal to create a premium, gallery-like visual experience.

### 1.1 Core Brand Colors

| Token | CSS Variable | HSL Specification | Hex Value | Semantic Usage & Tone |
| :--- | :--- | :--- | :--- | :--- |
| **Ivory** (Canvas) | `--background` | `hsl(45 20% 97%)` | `#FAF9F5` | Primary background, creating a warm, paper-like luxury feel. |
| **Obsidian** (Charcoal) | `--foreground` / `--primary` | `hsl(0 0% 7%)` | `#111111` | Primary text and major focus actions; near-black of high weight. |
| **Jewelry Teal** (Accent) | `--accent` / `--ring` | `hsl(179 80% 20%)` | `#0A5C5A` | Opulent gemstone green-blue used for hover highlights, focus rings, badges, and primary action buttons. |
| **Soft Cream** (Muted) | `--secondary` / `--muted` | `hsl(36 18% 93%)` | `#F3EFE9` | Subtle container backing, dividers, and low-contrast button states. |
| **Alabaster** (Card bg) | `--card` / `--popover` | `hsl(60 17% 99%)` | `#FDFDFB` | Inner cards, drop-down menus, and dialog canvas backing. |
| **Soft Beige-Gray** | `--border` / `--input` | `hsl(37 15% 88%)` | `#E5E0D8` | Thin, elegant dividing lines and border limits. |
| **Charcoal Gray** (Muted text)| `--muted-foreground` | `hsl(0 0% 46%)` | `#767676` | Low-emphasis annotations, breadcrumbs, and SKU tags. |
| **Gem Red** (Destructive) | `--destructive` | `hsl(0 84.2% 60.2%)` | `#EF4444` | Alerts, error indicators, and unavailable stock states. |

### 1.2 Dark Mode Colors (Inverted HSL Tokens)

For high-contrast nocturnal viewing, the system defines inverted variables inside `.dark` selectors:

*   `--background`: `hsl(0 0% 7%)` (`#111111` Charcoal)
*   `--foreground`: `hsl(45 20% 97%)` (`#FAF9F5` Ivory)
*   `--card`: `hsl(0 0% 10%)` (`#1A1A1A`)
*   `--accent`: `hsl(179 80% 40%)` (`#14B8B6` Lighter Teal)
*   `--border` / `--input`: `hsl(0 0% 20%)` (`#333333`)

---

## 2. Typography & Font Scales

Labonno's typographic structure mirrors fine print publications, pairing high-contrast serifs with ultra-clean modern sans-serif.

### 2.1 Font Families

*   **Display Font (Serif)**: `"Playfair Display"`, Georgia, serif
    *   *Usage*: Headings, section titles, cinematic hero lines, and brand wordmarks.
    *   *Weights*: `400` (Light/Normal), `400-italic` (Editorial italic), `600` (Medium/Semi-bold), and `700` (Bold).
*   **Body Font (Sans-serif)**: `"Inter"`, system-ui, sans-serif
    *   *Usage*: Product meta-descriptions, form fields, filtering checklist labels, and pricing indices.
    *   *Weights*: `300` (Light), `400` (Regular), `500` (Medium), and `600` (Semi-bold).

### 2.2 Letter Spacing & Casings

To enhance modern luxury branding, custom wide trackings are used extensively:

*   `letterSpacing.luxury` (`0.2em`): `tracking-luxury` – Used for brand wordmarks (e.g. `LABONNO`), core category navigation anchors, and premium headings.
*   `letterSpacing.widest` (`0.15em`): `tracking-widest` – Applied to small uppercase badges, eyebrows (e.g., `THE COLLECTION`), and small active links.

### 2.3 Understated Casing Scale

*   **Uppercase (`uppercase`)**: Employed on almost all sans-serif headings, navigation links, and small status text.
*   **Lowercase Italic (`lowercase italic`)**: Employed in editorial links (e.g., *Sabyasachi/Gucci style* pointers) to break the rigidity of uppercase blocks.

---

## 3. Layout, Margins & Spacing

Spacings are wide and deliberate to evoke a premium "art-gallery" atmosphere with plenty of white space.

### 3.1 Page Margins & Padding Scales
Layouts are managed by the `container` utility configured with generous, screen-dependent padding rules:

*   `container` centering: `mx-auto`
*   `DEFAULT` (Mobile): `padding: "1.5rem"` (`px-6`)
*   `sm` (Tablets): `padding: "2rem"` (`px-8`)
*   `lg` (Small Desktops): `padding: "4rem"` (`px-16`)
*   `xl` (Desktops): `padding: "6rem"` (`px-24`)
*   `2xl` (Wide Screens): `padding: "8rem"` (`px-32`)

### 3.2 Desktop & Mobile Fixed Header Compensation
Because the header is fixed-to-top (`fixed top-0 left-0 right-0 z-40`), page content must include matching offset margins to avoid overlaps:

*   **Mobile offset**: `pt-24` or `h-16 bg-[#fdfbf7]` spacer.
*   **Tablet/Desktop offset**: `pt-32` / `pt-36` or `h-20 sm:h-20 md:h-32 bg-[#fdfbf7]` spacer blocks.

### 3.3 Custom Extended Spacing Tokens
Tailwind was extended with oversized vertical spacing values to allow fluid, cinematic section breaks:

*   `18` (`4.5rem` / `72px`)
*   `22` (`5.5rem` / `88px`)
*   `26` (`6.5rem` / `104px`)
*   `30` (`7.5rem` / `120px`)

---

## 4. Borders & Radius System

Luxury brands establish minimalism through sharp, hard structural elements. Labonno fully embraces this aesthetic by completely removing rounded corners.

### 4.1 Sharp Radius Constraint
*   `--radius: 0px` – This token forces **absolute 0px sharp, square corners** across the entire UI.
*   All downstream Tailwind classes evaluate to hard edges:
    *   `rounded-lg` -> `var(--radius)` -> `0px`
    *   `rounded-md` -> `calc(var(--radius) - 2px)` -> `0px` (clamped to 0)
    *   `rounded-sm` -> `calc(var(--radius) - 4px)` -> `0px`
*   This constraint governs **every single component**: Product hover cards, primary buttons, input boxes, filter drawer sheets, drop-down selects, rating badges, and modal dialogs.

### 4.2 Border Weights
*   All borders utilize a subtle weight of `1px` (`border`), styled in `border-border` (`#E5E0D8` Soft Beige-Gray), providing ultra-fine dividing lines that are clear without being visually heavy.

---

## 5. Component Variant Conventions

### 5.1 Button Variants (`src/components/ui/button.tsx`)

Buttons use `h-11` as default height and support distinct typographic and action variants:

| Variant Name | Classes & Styling | Visual Tone & Intent |
| :--- | :--- | :--- |
| **`default`** | `bg-primary text-primary-foreground hover:bg-primary/90 border border-primary` | Standard solid Obsidian action button (near-black, sharp). |
| **`accent`** | `bg-accent text-accent-foreground hover:bg-accent/90 border border-accent` | Solid Jewelry Teal button used for high-end conversion focus (e.g. PDP 'Add to Basket'). |
| **`outline`** | `border border-border bg-background hover:bg-secondary hover:text-secondary-foreground` | Soft Beige-Gray border on Ivory canvas, hover turns to soft cream. Primary secondary action. |
| **`secondary`** | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Soft cream button block used for non-conversion secondary paths. |
| **`ghost`** | `hover:bg-secondary hover:text-secondary-foreground` | Borderless clear button, highlights on hover with a soft cream bg block. |
| **`link`** | `text-primary hover:text-accent underline-offset-4 hover:underline` | Standard inline navigation text-link (standard casing, normal tracking). |
| **`editorialLink`**| `relative text-foreground hover:text-accent font-serif tracking-wide lowercase italic after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100` | Beautiful Serif italic pointer with custom hover underline expanders (Sabyasachi/Gucci style). |

### 5.2 Badge Variants (`src/components/ui/badge.tsx`)

Badges are used for product flags, categorizations, and stock updates. They feature a compressed tracking font scale:

*   **`default`**: Solid Obsidian Charcoal background (`bg-primary text-primary-foreground`).
*   **`secondary`**: Soft Cream backing (`bg-secondary text-secondary-foreground`).
*   **`accent`**: Solid Jewelry Teal backing (`bg-accent text-accent-foreground`). Used to flag "New" or premium collections.
*   **`outline`**: Transparent back with a fine border (`text-foreground border-border`).
*   **`destructive`**: Warm Gem-Red backing (`bg-destructive text-destructive-foreground`). Highlights "Out of Stock" or "Unavailable" pieces.

### 5.3 Custom Underline Hover States
A defining brand detail in Labonno is the **expand-from-center horizontal underline** utilized in Nav menus (`NavRow.tsx`):

```html
{/* Expand-from-center horizontal underline */}
<span className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
```

*   **Closed State**: Underline scales down to `scale-x-0` about the center point.
*   **Hovered State**: Scales smoothly to `scale-x-100` (`origin-center`), drawing a thin, elegant line beneath the luxury category title.

---

## 6. Motion & Visual Transition Scales

Transitions are slow, fluid, and custom-curved to establish a heavy, tactile, "cinematic" brand feeling on interaction.

### 6.1 Custom Animation Keyframes
*   **Scroll-Reveal Fades (`reveal-on-scroll`)**:
    *   *Duration*: `1s`
    *   *Easing*: `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-premium ease-out curve, slow and smooth).
    *   *Behavior*: Animates opacity from `0` to `1` while translating upward `20px` to `0px` on viewport mount.
*   **Accordion Down/Up**:
    *   *Duration*: `0.2s`
    *   *Easing*: `ease-out`
    *   *Behavior*: Expands and contracts height bounds for Radix accordion specs dynamically.

### 6.2 Image Transition Scales (`ProductCard.tsx` / `Home.tsx`)
*   **Zoom on Hover**: Hovering over product lists or editorial containers invokes a custom transition scale:
    *   *Transition speed*: `duration-1000` (full `1000ms` duration).
    *   *Scale offsets*: Base scale `scale-105` slowly settling back down to `scale-100`, or scale `scale-100` rising to `scale-150` under slow mouse hovers.
*   **Alternate Hover Reveal**: Product cards hold an alternate lifestyle image hidden via `opacity-0`. On mouse hover, the primary image remains while the lifestyle thumbnail transitions to `opacity-100` over a full `duration-1000` span, revealing the on-model detail.
