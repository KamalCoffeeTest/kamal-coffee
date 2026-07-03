# Kamal Coffee — Design Tokens

Design tokens are the named values (colors, fonts, spacing) used across the site. Implement these in `app/globals.css` via Tailwind CSS v4 `@theme` when building UI in future milestones.

## Color palette

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#F7F3ED` | Primary page background |
| `oat` | `#EDE6DA` | Alternate section background |
| `sand` | `#E2D8C8` | Subtle section contrast, cards |
| `soft-daylight` | `#FAF8F4` | Hero overlays, light washes |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `espresso` | `#3D2B1F` | Primary headings and body |
| `charcoal` | `#2A2622` | High-emphasis text |
| `taupe` | `#8C7B6B` | Secondary text, captions |
| `muted-navy` | `#3D4A5C` | Accent text, links (sparingly) |

### Accents

| Token | Hex | Usage |
|-------|-----|-------|
| `caramel` | `#B8895A` | Highlights, dividers, subtle accents |
| `espresso-deep` | `#2C1E14` | Footer background, dark sections |

### Semantic (future use)

| Token | Maps to | Usage |
|-------|---------|-------|
| `background` | `cream` | Default page background |
| `foreground` | `espresso` | Default text color |
| `muted` | `taupe` | Secondary text |
| `accent` | `caramel` | Interactive accents |

## Typography

Replace the default Geist fonts before launch. Target pairings (final selection in a future milestone):

| Role | Direction | Notes |
|------|-----------|-------|
| Display / headlines | Refined serif or editorial sans | Confident, not decorative |
| Body | Clean humanist sans | Readable at 16–18px |
| Labels / captions | Same as body, uppercase or small caps optional | Restrained tracking |

### Scale (reference)

| Name | Size | Line height | Usage |
|------|------|-------------|-------|
| `display-xl` | 3.5rem / 56px | 1.1 | Hero headline (desktop) |
| `display-lg` | 2.5rem / 40px | 1.15 | Section headlines |
| `heading` | 1.75rem / 28px | 1.25 | Subsection titles |
| `body-lg` | 1.125rem / 18px | 1.6 | Lead paragraphs |
| `body` | 1rem / 16px | 1.6 | Body copy |
| `caption` | 0.875rem / 14px | 1.5 | Labels, fine print |

### Weight

Use **two weights maximum** in most views (e.g. 400 regular + 500 or 600 medium).

## Spacing

Base unit: **4px**. Prefer multiples of 8 for section padding.

| Token | Value | Usage |
|-------|-------|-------|
| `section-y` | 6rem / 96px | Vertical padding between major sections (desktop) |
| `section-y-mobile` | 4rem / 64px | Vertical padding on mobile |
| `content-max` | 72rem / 1152px | Max content width |
| `text-max` | 42rem / 672px | Max width for readable paragraphs |

## Border radius

Keep corners **subtle** — this is not a playful consumer app.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Buttons, small elements |
| `radius-md` | 8px | Cards, image frames |
| `radius-full` | 9999px | Pills, tags (use sparingly) |

## Shadows

Prefer **flat or very soft shadows**. Matte surfaces, not glassmorphism.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-soft` | `0 4px 24px rgba(61, 43, 31, 0.08)` | Product images, cards |
| `shadow-none` | none | Default for most surfaces |

## Motion

When animation is added in later milestones:

- Subtle fade-in on scroll; no bounce or spring physics
- Duration: 300–600ms
- Easing: ease-out
- Respect `prefers-reduced-motion`

## Implementation notes

When updating `app/globals.css`, map tokens into Tailwind's `@theme inline` block:

```css
@theme inline {
  --color-cream: #F7F3ED;
  --color-oat: #EDE6DA;
  --color-espresso: #3D2B1F;
  /* ... */
}
```

Do not hardcode hex values in components — use token class names (`bg-cream`, `text-espresso`, etc.).
