import { CanIllustration } from "@/components/can-illustration";
import { Section, SectionHeader } from "@/components/section";

export function DairyFreeSection() {
  return (
    <Section variant="cream">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <SectionHeader
          title="Dairy-free. Vegan. No compromises."
          description="Kamal is made without dairy and without animal products — so everyone can enjoy Vietnamese iced coffee, exactly as it should be."
        />
        <div className="flex aspect-square w-full max-w-xs items-center justify-center justify-self-center rounded-md bg-sand p-10 shadow-soft md:max-w-sm">
          <CanIllustration className="h-full w-full" variant="detail" />
        </div>
      </div>
    </Section>
  );
}
