<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kamal Coffee — Agent Guide

This repo is the official website for **Kamal Coffee**, a premium Vietnamese ready-to-drink iced coffee brand.

## Before writing code

Read these files in order:

1. [docs/scope.md](docs/scope.md) — what is in and out of scope
2. [docs/brand.md](docs/brand.md) — visual and voice direction
3. [docs/design-tokens.md](docs/design-tokens.md) — colors, type, spacing
4. [docs/content.md](docs/content.md) — approved section copy
5. [TODO.md](TODO.md) — current milestone and task list

## Project direction

- **The can is the hero.** Product photography leads; UI supports it.
- **Premium beverage ad, not ecommerce.** No cart, checkout, pricing, fake retailers, or fake national availability.
- **Warm minimalism.** Cream, oat, sand, espresso, caramel, muted navy. Matte surfaces, editorial photography, restrained typography.
- **Farmers-market-first.** LA and Orange County. Pre-retail phase.
- **One question per homepage section.** Do not combine topics.

## Core product truths (always accurate)

1. Vietnamese iced coffee
2. Vegan
3. Dairy free
4. Sweetened with allulose instead of sugar

## Tech conventions

- **Framework:** Next.js 16 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4 via `app/globals.css` — use design tokens, not raw hex in components
- **Assets:** Static files in `public/`; use `next/image` for photos
- **Path alias:** `@/*` maps to project root

## Do not add without explicit approval

- shadcn/ui, Framer Motion, or heavy UI libraries
- Ecommerce, payments, subscriptions, customer accounts
- Database, CMS, or backend API routes
- Fake retailer logos or invented store locations
- Deployment configuration (separate milestone)

## File structure (target)

```
app/           # pages, layout, globals.css
components/    # shared UI (header, footer, sections)
lib/           # constants (market dates, social URLs)
public/        # static assets
docs/          # brand, content, scope documentation
```

## When in doubt

Check [DECISIONS.md](DECISIONS.md) for past choices. If a new decision is needed, add an entry there and update [docs/scope.md](docs/scope.md) if scope changes.
