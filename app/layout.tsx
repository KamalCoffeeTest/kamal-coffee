import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kamal Coffee",
    template: "%s | Kamal Coffee",
  },
  description:
    "Premium Vietnamese ready-to-drink iced coffee. Vegan, dairy-free, sweetened with allulose. Find us at farmers markets in Los Angeles and Orange County.",
  openGraph: {
    title: "Kamal Coffee",
    description:
      "Premium Vietnamese ready-to-drink iced coffee. Vegan, dairy-free, sweetened with allulose.",
    type: "website",
    locale: "en_US",
    siteName: "Kamal Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamal Coffee",
    description:
      "Premium Vietnamese ready-to-drink iced coffee. Vegan, dairy-free, sweetened with allulose.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preload" href="/images/kamal/hero-poster.jpg" as="image" />
      </head>
      <body className="flex min-h-full flex-col bg-cream font-sans text-espresso">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
