# Kamal Coffee

Official website for **Kamal Coffee** — a premium Vietnamese ready-to-drink iced coffee brand based in Southern California.

The site should feel like a premium beverage advertisement: warm, cinematic, and product-first. The can is the hero.

## Current phase

Kamal is **pre-retail** and **farmers-market-first** in Los Angeles and Orange County. This repo is a marketing site, not an ecommerce store. See [docs/scope.md](docs/scope.md) for what is in and out of scope.

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
app/              # Next.js App Router (pages, layout, global styles)
public/           # Static assets (images, icons)
docs/             # Brand, content, and scope documentation
components/       # Shared UI components (future milestones)
lib/              # Constants and helpers (future milestones)
```

## For contributors and AI agents

Before writing code, read:

1. [docs/scope.md](docs/scope.md) — do not add ecommerce features
2. [docs/brand.md](docs/brand.md) — match the warm, premium visual direction
3. [AGENTS.md](AGENTS.md) — Next.js 16 notes and project conventions

When implementing UI, use tokens from [docs/design-tokens.md](docs/design-tokens.md) and copy from [docs/content.md](docs/content.md).
