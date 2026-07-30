import OffersHero from "@/frontend/components/offers/OffersHero";
import FeaturedOffers from "@/frontend/components/offers/FeaturedOffers";
import ComboOffers from "@/frontend/components/offers/ComboOffers";
import TodaySpecial from "@/frontend/components/offers/TodaySpecial";
import OffersCTA from "@/frontend/components/offers/OffersCTA";

export const metadata = {
  title: "Special Offers | The Tasty Zone",
  description: "Enjoy delicious food at exciting prices. Grab our best deals, combos, and weekend specials today.",
};

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-16 md:pt-0">
      <OffersHero />
      <FeaturedOffers />
      <TodaySpecial />
      <ComboOffers />
      <OffersCTA />
    </main>
  );
}
