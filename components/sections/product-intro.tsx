import { Section, SectionHeader } from "@/components/section";
import { productPoints } from "@/lib/constants";

export function ProductIntroSection() {
  return (
    <Section variant="cream">
      <SectionHeader
        title="Coffee, reimagined for the can."
        description="Kamal brings the richness of Vietnamese iced coffee into a ready-to-drink format — crafted to taste bold, smooth, and unmistakably premium. No mixing. No waiting. Just open and enjoy."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {productPoints.map((point) => (
          <li
            key={point}
            className="rounded-md border border-espresso/8 bg-oat/50 px-5 py-4 text-sm font-medium text-espresso"
          >
            {point}
          </li>
        ))}
      </ul>
    </Section>
  );
}
