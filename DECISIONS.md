# Kamal Coffee — Decision Log

Record of significant project decisions. Add a new entry when choosing between alternatives or changing direction.

---

## 2026-07-02 — Site type: marketing, not ecommerce

**Decision:** Build a premium marketing website, not an online store.

**Context:** Kamal is pre-retail and farmers-market-first in LA and OC. There is no need for cart, checkout, or payment flows.

**Consequences:** No ecommerce dependencies, no database, no customer accounts. Homepage focuses on product storytelling and local discovery.

---

## 2026-07-02 — Homepage structure: one question per section

**Decision:** Each homepage section answers exactly one question.

**Sections:**
1. Hero — What is Kamal?
2. Product intro — What makes it special?
3. Allulose — What is allulose?
4. Dairy-free / vegan
5. Vietnamese coffee
6. Our Story preview
7. Find Us
8. FAQ
9. Footer

**Context:** Keeps the site scannable, premium, and non-overwhelming. Avoids the "everything at once" feel of generic landing pages.

**Consequences:** Components should be small and focused. Resist combining topics (e.g. do not merge allulose and vegan into one section).

---

## 2026-07-02 — Visual direction: warm minimalism

**Decision:** Use a warm, matte palette (cream, oat, sand, espresso, caramel, muted navy) with editorial product photography and restrained typography.

**Context:** Brand should feel like a premium beverage ad, not a Shopify template or AI-generated minimal site.

**Consequences:** Design tokens defined in docs/design-tokens.md. Default create-next-app dark mode and Geist fonts will be replaced in Milestone 2.

---

## 2026-07-02 — Tech stack: Next.js 16 + Tailwind v4, no extra UI libraries yet

**Decision:** Stay on the create-next-app stack. Do not add shadcn/ui, Framer Motion, CMS, or database in early milestones.

**Context:** Minimize dependencies and avoid importing generic component aesthetics. Tailwind v4 + custom components match the brand better.

**Consequences:** Motion, if any, uses CSS transitions first. Content is static/hardcoded until a CMS is explicitly scoped.

---

## 2026-07-02 — The can is the hero

**Decision:** Product photography of the Kamal can is the primary visual across the site, especially the homepage hero.

**Context:** Visitors should remember the can first. Text and UI support the product, not the other way around.

**Consequences:** Asset requirements prioritize can photography (see docs/assets.md). Do not launch homepage without hero can imagery.

---

## Template for future entries

```
## YYYY-MM-DD — Short title

**Decision:** What we decided.

**Context:** Why this came up.

**Alternatives considered:** What we did not choose and why.

**Consequences:** What this means for future work.
```
