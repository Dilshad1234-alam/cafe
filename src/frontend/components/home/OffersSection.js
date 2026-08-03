import Image from "next/image";
import Link from "next/link";
import { offers } from "@/frontend/data/offers";
import { Tag } from "lucide-react";

export default function OffersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-charcoal mb-4">Special Offers</h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Grab these amazing deals before they&apos;re gone! Best prices on your favorite meals.
            </p>
          </div>
          <Link 
            href="/offers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-xl font-bold hover:bg-red-700 transition-colors shrink-0"
          >
            <Tag className="w-5 h-5" />
            View All Offers
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="group flex flex-col sm:flex-row bg-brand-cream rounded-2xl overflow-hidden border border-brand-yellow/30 hover:border-brand-yellow hover:shadow-xl hover:shadow-brand-yellow/10 transition-all duration-300 relative"
            >
              {/* Image side */}
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                <Image 
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden"></div>
                
                {/* Mobile price overlay */}
                <div className="absolute bottom-4 left-4 sm:hidden">
                  <div className="bg-brand-red text-white px-3 py-1 rounded-lg font-black text-lg shadow-lg">
                    {offer.price}
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="p-6 sm:w-3/5 flex flex-col">
                <h3 className="font-bold text-xl text-brand-charcoal mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="hidden sm:block">
                      <span className="bg-brand-red text-white px-3 py-1.5 rounded-lg font-black text-lg shadow-md">
                        {offer.price}
                      </span>
                      {offer.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">{offer.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="bg-white px-3 py-1.5 border border-dashed border-gray-300 rounded font-mono text-sm font-bold text-brand-charcoal">
                      {offer.code}
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-gray-400">{offer.terms}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
