import { Section, SectionHeader } from "@/components/section";

export function FindUsSection() {
  return (
    <Section variant="cream" id="find-us">
      <SectionHeader
        title="Find us at the market."
        description="Kamal is rolling out at farmers markets across Los Angeles and Orange County. Come say hello, try a can, and be the first to know when we expand."
      />
      <div className="max-w-xl rounded-md border border-espresso/10 bg-oat/60 px-6 py-8">
        <p className="text-sm font-medium tracking-wide text-taupe uppercase">
          Upcoming markets
        </p>
        <p className="mt-3 text-lg text-espresso">
          Market schedule coming soon. Follow us on Instagram for updates.
        </p>
      </div>
    </Section>
  );
}
