import { ReservePageClient } from "./reserve-client";

export const metadata = {
  title: "Reserve — KAMAL Vietnamese Iced Coffee",
  description: "Reserve your spot for the next small-batch drop of authentic cà phê sữa đá. Leave your ZIP and email to join the notification list for our LA-brewed cold cans.",
  openGraph: {
    title: "Reserve — KAMAL Vietnamese Iced Coffee",
    description: "Reserve your spot for the next small-batch drop of authentic cà phê sữa đá. Brewed in small batches in LA, shipped cold nationwide.",
    type: "website",
    images: [
      {
        url: "/images/kamal/can-render.png",
        width: 432,
        height: 577,
        alt: "KAMAL Vietnamese Iced Coffee can",
      }
    ]
  }
};

export default function ReservePage() {
  return <ReservePageClient />;
}
