import OfferCard from "./OfferCard";
import { offersPageData } from "@/frontend/data/offersPage";
import { Flame } from "lucide-react";

export default function ComboOffers() {
  const combos = offersPageData.filter(offer => offer.category === "combo");

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
            <Flame className="w-4 h-4" />
            HOT DEALS
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Combo Meals
          </h2>
          <p className="text-gray-600 max-w-xl font-medium">
            Perfect pairings at unbeatable prices. More food, less money. Bring your friends and feast!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {combos.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

      </div>
    </section>
  );
}
