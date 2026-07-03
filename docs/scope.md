# Kamal Coffee — Project Scope

This document defines what we **are** and **are not** building. All contributors and AI agents must read this before adding features.

## Project type

A **marketing website** for a premium Vietnamese ready-to-drink iced coffee brand. The site is a premium beverage advertisement — product-first, warm, cinematic — not an ecommerce store.

## Current business phase

- **Pre-retail** — no online sales
- **Farmers-market-first** — Los Angeles and Orange County
- Visitors should learn about the product and find Kamal at local markets

## In scope

### Website goals

- Introduce Kamal Coffee and the product (the can is the hero)
- Communicate core product truths: Vietnamese iced coffee, vegan, dairy-free, allulose-sweetened
- Share brand story and founders' narrative (preview on homepage, full page later)
- Help visitors find Kamal at farmers markets
- Answer common questions (FAQ)
- Provide contact and social links

### Technical scope (current and near-term)

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4 for styling
- Static content (hardcoded or from local constants — no CMS yet)
- Static assets in `public/`
- Responsive, accessible, performant pages
- SEO metadata and Open Graph images

### Planned pages (future milestones)

| Page | Status |
|------|--------|
| Homepage (`/`) | Planned — Milestone 2+ |
| Our Story (`/story`) | Future |
| Find Us (`/find-us`) | Future |
| FAQ (homepage section or `/faq`) | Future |

## Out of scope (do not build without explicit approval)

### Ecommerce and transactions

- Shopping cart
- Checkout flow
- Product pricing or price-first sections
- "Buy now" / "Shop now" buttons that imply purchase
- Payment processing (Stripe, PayPal, etc.)
- Subscriptions
- Customer accounts / login
- Order history
- Inventory management

### Fake or premature business features

- Fake retailer or partner logos (Whole Foods, Target, etc.)
- Fake "Available nationwide" messaging
- Fake store locator with invented locations
- "As seen in" press logos unless real and approved
- Stock availability widgets

### Infrastructure not yet needed

- Database
- Backend API routes (except possibly a simple contact form in a much later milestone)
- CMS (Contentful, Sanity, etc.)
- Email marketing backend (Mailchimp integration, etc.)
- Analytics beyond basic (defer until deployment milestone)
- Authentication

### UI libraries and dependencies (defer)

- shadcn/ui
- Framer Motion (consider native CSS transitions first)
- Heavy animation libraries
- Component libraries that impose a generic ecommerce look

### Deployment configuration

- Vercel/hosting config changes are deferred to a dedicated deployment milestone
- Environment variables for third-party services (unless required for approved features)

## Section rules for homepage

Each homepage section answers **exactly one question**. Do not combine multiple topics in one section.

See [content.md](content.md) for the section-to-question mapping.

## Decision process

If a feature is not listed in "In scope," assume it is **out of scope**. To add something new:

1. Document the rationale in [DECISIONS.md](../DECISIONS.md)
2. Update this file
3. Get explicit approval before implementing
