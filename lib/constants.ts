export const siteConfig = {
  name: "Kamal Coffee",
  tagline: "Premium Vietnamese iced coffee in a can.",
  description:
    "Premium Vietnamese ready-to-drink iced coffee. Vegan, dairy-free, sweetened with allulose. Find us at farmers markets in Los Angeles and Orange County.",
  url: "https://kamalcoffee.com",
  email: "hello@kamalcoffee.com",
  instagram: "https://instagram.com/kamalcoffee",
} as const;

export const navLinks = [
  { label: "Story", href: "#our-story" },
  { label: "Find Us", href: "#find-us" },
  { label: "FAQ", href: "#faq" },
] as const;

export const productPoints = [
  "Vietnamese iced coffee",
  "Ready to drink",
  "Vegan and dairy-free",
  "Sweetened with allulose, not sugar",
] as const;

export const faqItems = [
  {
    question: "What does Kamal taste like?",
    answer:
      "Bold Vietnamese iced coffee — smooth, balanced, and lightly sweet.",
  },
  {
    question: "Is Kamal vegan?",
    answer: "Yes. Kamal is fully vegan and dairy-free.",
  },
  {
    question: "What sweetener does Kamal use?",
    answer: "Allulose, not sugar.",
  },
  {
    question: "Where can I buy Kamal?",
    answer:
      "At farmers markets across Los Angeles and Orange County. See Find Us for updates.",
  },
  {
    question: "Do you ship online?",
    answer: "Not yet. We're starting local at markets.",
  },
] as const;
