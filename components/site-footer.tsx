import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-espresso-deep text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-xl font-medium tracking-wide">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-light-taupe">
            Premium Vietnamese iced coffee. Find us at farmers markets in Los
            Angeles and Orange County.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-taupe transition-colors hover:text-cream"
          >
            Instagram
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-light-taupe transition-colors hover:text-cream"
          >
            {siteConfig.email}
          </a>
          <Link
            href="#find-us"
            className="text-light-taupe transition-colors hover:text-cream"
          >
            Find Us
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-light-taupe md:px-8">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
