import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-espresso/8 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-wide text-charcoal"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-taupe transition-colors hover:text-espresso"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
