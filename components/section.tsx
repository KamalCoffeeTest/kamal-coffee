import type { ReactNode } from "react";

type SectionVariant = "cream" | "oat" | "sand" | "espresso-deep";

const variantClasses: Record<SectionVariant, string> = {
  cream: "bg-cream text-espresso",
  oat: "bg-oat text-espresso",
  sand: "bg-sand text-espresso",
  "espresso-deep": "bg-espresso-deep text-cream",
};

type SectionProps = {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  variant = "cream",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${variantClasses[variant]} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeader({
  title,
  description,
  align = "left",
  invert = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleClass = invert ? "text-cream" : "text-charcoal";
  const descClass = invert ? "text-light-taupe" : "text-taupe";

  return (
    <header className={`mb-10 max-w-2xl ${alignClass}`}>
      <h2
        className={`font-display text-3xl font-medium tracking-tight md:text-4xl ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-relaxed ${descClass}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
