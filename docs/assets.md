# Kamal Coffee — Asset Guide

Requirements and conventions for images, icons, and other static files.

## Storage locations

| Type | Location | Notes |
|------|----------|-------|
| Product photography | `public/images/product/` | Can shots, editorial angles |
| Hero imagery | `public/images/hero/` | Full-width homepage hero |
| Brand marks | `public/images/brand/` | Logo, wordmark, favicon source |
| Open Graph | `public/og/` | Social sharing images |
| Favicon | `app/favicon.ico` | Next.js App Router convention |
| SVG icons | `public/icons/` | Simple UI icons if needed |

Reference assets in code as `/images/product/can-front.webp` (paths relative to `public/`).

Use `next/image` for all photography in components.

## Required assets (checklist)

### Priority 1 — needed for homepage launch

| Asset | Filename (suggested) | Specs | Status |
|-------|---------------------|-------|--------|
| Can hero — front, centered | `hero/can-hero-front.webp` | 2400×3000px min, WebP | Needed |
| Can hero — angled / cinematic | `hero/can-hero-angle.webp` | 2400×1600px min, WebP | Needed |
| Can detail — close-up | `product/can-detail.webp` | 1600×1600px, WebP | Needed |
| Logo / wordmark | `brand/kamal-wordmark.svg` | SVG, transparent | Needed |
| Favicon source | `brand/favicon-source.png` | 512×512px PNG | Needed |
| Open Graph image | `og/og-default.webp` | 1200×630px, WebP | Needed |

### Priority 2 — nice to have for launch

| Asset | Filename (suggested) | Specs | Status |
|-------|---------------------|-------|--------|
| Can in context (market / lifestyle) | `product/can-lifestyle.webp` | 2400×1600px, WebP | Needed |
| Ingredient / allulose visual | `product/allulose-context.webp` | 1600×1200px, WebP | Optional |
| Vietnamese coffee culture | `product/coffee-culture.webp` | 1600×1200px, WebP | Optional |

## Photography direction

Follow [brand.md](brand.md):

- **The can is always the hero** — sharp focus on product, soft background
- Warm, soft daylight — golden hour or overcast natural light
- Matte surfaces: linen, stone, wood, cream paper
- Minimal props — nothing that competes with the can
- No stock photography aesthetic
- No obvious AI-generated imagery

### Angles to capture

1. Straight-on front (label readable)
2. 3/4 angle (shows can form)
3. Close-up on label detail
4. Can with condensation (optional, if authentic)
5. Hand holding can at market (lifestyle, optional)

## File naming conventions

```
{category}/{subject}-{variant}.{ext}

Examples:
  hero/can-hero-front.webp
  hero/can-hero-angle.webp
  product/can-detail-label.webp
  brand/kamal-wordmark-dark.svg
  brand/kamal-wordmark-light.svg
  og/og-default.webp
```

Rules:

- Lowercase, hyphen-separated
- No spaces or special characters
- Include variant when multiple versions exist (`-dark`, `-light`, `-mobile`)
- Prefer **WebP** for photos; **SVG** for logos and icons

## Image optimization

Before adding to the repo:

- Compress WebP at 80–85% quality
- Target < 300KB for hero images, < 150KB for section images
- Provide appropriate `width` and `height` to `next/image`
- Write descriptive `alt` text (e.g. "Kamal Coffee Vietnamese iced coffee can, front view")

## Assets to remove (scaffold leftovers)

These create-next-app defaults should be deleted when real assets are added:

- `public/next.svg`
- `public/vercel.svg`
- `public/file.svg`
- `public/globe.svg`
- `public/window.svg`

Do not delete until replacement assets exist or the homepage no longer references them.

## Folder structure to create (Milestone 2+)

```
public/
  images/
    hero/
    product/
    brand/
  og/
  icons/
```

Folders can be created empty with a `.gitkeep` when implementation begins.
