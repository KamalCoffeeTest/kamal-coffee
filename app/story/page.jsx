import { OurStoryPage } from "./story-client";

export const metadata = {
  title: "Our Story — KAMAL Coffee",
  description: "We grew up on cà phê sữa đá — and wanted a version that loved us back. Premium Vietnamese ready-to-drink iced coffee. Vegan, dairy-free, sweetened with allulose.",
  openGraph: {
    title: "Our Story — KAMAL Coffee",
    description: "We grew up on cà phê sữa đá — and wanted a version that loved us back. Premium Vietnamese ready-to-drink iced coffee.",
    type: "website",
  }
};

export default function StoryPage() {
  return <OurStoryPage />;
}
