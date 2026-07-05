import { Section, SectionHeader } from "@/components/section";
import { faqItems } from "@/lib/constants";

export function FaqSection() {
  return (
    <Section variant="oat" id="faq">
      <SectionHeader title="What else should I know?" />
      <dl className="divide-y divide-espresso/10">
        {faqItems.map((item) => (
          <div key={item.question} className="py-6 first:pt-0 last:pb-0">
            <dt className="font-display text-lg font-medium text-charcoal">
              {item.question}
            </dt>
            <dd className="mt-2 leading-relaxed text-taupe">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
