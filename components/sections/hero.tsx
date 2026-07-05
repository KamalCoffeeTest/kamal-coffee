import Link from "next/link";
import { CanIllustration } from "@/components/can-illustration";
import { siteConfig } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-soft-daylight">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="mb-4 text-sm font-medium tracking-[0.25em] text-light-taupe uppercase">
            {siteConfig.name}
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-taupe">
            Vegan. Dairy-free. Sweetened with allulose.
          </p>
          <div className="mt-10">
            <Link
              href="#find-us"
              className="inline-flex items-center justify-center rounded-sm border border-espresso/15 bg-oat px-8 py-3 text-sm font-medium tracking-wide text-espresso shadow-soft transition-colors hover:bg-sand"
            >
              Find Kamal
            </Link>
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative aspect-[3/4] w-full max-w-xs rounded-md bg-oat p-8 shadow-soft md:max-w-sm">
            <CanIllustration className="h-full w-full" variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
