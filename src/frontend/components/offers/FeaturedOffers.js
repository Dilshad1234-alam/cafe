import OfferCard from "./OfferCard";
import { offersPageData } from "@/frontend/data/offersPage";
import { Sparkles } from "lucide-react";

export default function FeaturedOffers() {
  const featured = offersPageData.slice(0, 4);

  return (
    <section id="deals" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/20 text-brand-charcoal text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4 text-brand-yellow" />
              TOP PICKS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-charcoal">
              Featured Deals
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm text-center md:text-right font-medium">
            Handpicked offers designed to give you maximum taste at minimum price.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featured.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

      </div>
    </section>
  );
}
