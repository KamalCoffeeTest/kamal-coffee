# Kamal Coffee

Official website for **Kamal Coffee** — a premium Vietnamese ready-to-drink iced coffee brand based in Southern California.

The site feels like a premium beverage advertisement: warm, cinematic, and product-first. The can is the hero.

## Current phase

Kamal is **pre-retail** and **farmers-market-first** in Los Angeles and Orange County. This is a marketing site, not an ecommerce store. See [docs/scope.md](docs/scope.md) for what is in and out of scope.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)

## Project docs

| File | Purpose |
|------|---------|
| [docs/brand.md](docs/brand.md) | Brand voice, visual direction, and design principles |
| [docs/design-tokens.md](docs/design-tokens.md) | Colors, typography, and spacing for implementation |
| [docs/content.md](docs/content.md) | Approved copy and section messaging |
| [docs/scope.md](docs/scope.md) | What we are and are not building |
| [docs/assets.md](docs/assets.md) | Image requirements and file naming |
| [TODO.md](TODO.md) | Milestone checklist and upcoming work |
| [DECISIONS.md](DECISIONS.md) | Record of project decisions |
| [AGENTS.md](AGENTS.md) | Guidance for AI coding agents |

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other commands:

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # run ESLint
```

## Project structure

```
app/
  layout.tsx            # root layout, fonts, metadata
  page.tsx              # homepage
  globals.css           # design tokens + Tailwind
  icon.tsx              # favicon
  opengraph-image.tsx   # social sharing image
components/
  site-header.tsx       # sticky header with wordmark + nav
  site-footer.tsx       # footer with contact links
  section.tsx           # reusable section wrapper
  can-illustration.tsx  # placeholder can SVG (replace with photography)
  sections/             # homepage sections (one question each)
lib/
  constants.ts          # site copy, FAQ, nav links
public/
  images/               # product photography (hero/, product/, brand/)
  og/                   # static OG assets
docs/                   # brand, content, and scope documentation
```

## Homepage sections

Each section answers exactly one question:

1. Hero — What is Kamal?
2. Product intro — What makes it special?
3. Allulose — What is allulose?
4. Dairy-free / vegan — Is it dairy-free and vegan?
5. Vietnamese coffee — What is Vietnamese coffee?
6. Our Story — Who is behind Kamal?
7. Find Us — Where can I find Kamal?
8. FAQ — What else should I know?

## Deploy

This project is ready to deploy on [Vercel](https://vercel.com):

1. Push the repo to GitHub
2. Import the project in Vercel
3. Vercel auto-detects Next.js — no extra config required

Preview deployments are created automatically for each pull request.

## For contributors and AI agents

Before writing code, read:

1. [docs/scope.md](docs/scope.md) — do not add ecommerce features
2. [docs/brand.md](docs/brand.md) — match the warm, premium visual direction
3. [AGENTS.md](AGENTS.md) — Next.js 16 notes and project conventions

When implementing UI, use tokens from [docs/design-tokens.md](docs/design-tokens.md) and copy from [docs/content.md](docs/content.md).

## Next steps

- Replace `CanIllustration` placeholder with real product photography (see [docs/assets.md](docs/assets.md))
- Add confirmed farmers market dates to Find Us section
- Create `/story` and `/find-us` pages when content is ready
