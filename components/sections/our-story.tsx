import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";

export function OurStorySection() {
  return (
    <Section variant="oat" id="our-story">
      <SectionHeader
        title="Our story"
        description="Kamal started with a simple idea: bring the Vietnamese iced coffee we love to more people — in a can that feels as considered as what's inside. We're starting at farmers markets across Los Angeles and Orange County, one conversation at a time."
      />
      <Link
        href="#our-story"
        className="inline-flex items-center text-sm font-medium tracking-wide text-muted-navy transition-colors hover:text-espresso"
      >
        Read our full story →
      </Link>
    </Section>
  );
}
