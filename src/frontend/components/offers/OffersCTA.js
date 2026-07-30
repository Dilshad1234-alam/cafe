import Link from "next/link";
import { siteConfig } from "@/frontend/data/siteConfig";
import { Phone, ArrowRight } from "lucide-react";

export default function OffersCTA() {
  return (
    <section className="py-24 md:py-32 bg-brand-yellow relative overflow-hidden">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#161616_2px,_transparent_2px)]" style={{ backgroundSize: "32px 32px" }}></div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-brand-charcoal mb-6 leading-tight">
          Ready for a <br/> Delicious Feast?
        </h2>
        <p className="text-xl md:text-2xl text-brand-charcoal/80 font-medium mb-12 max-w-2xl mx-auto">
          Don&apos;t let these offers slip away. Order now and satisfy your cravings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            href="/menu"
            className="w-full sm:w-auto px-10 py-5 bg-brand-charcoal text-white rounded-2xl font-black text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl shadow-brand-charcoal/30 flex items-center justify-center gap-3 group"
          >
            Order Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <a 
            href={siteConfig.links.phone}
            className="w-full sm:w-auto px-10 py-5 bg-white text-brand-charcoal rounded-2xl font-black text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call to Order
          </a>
        </div>
      </div>
    </section>
  );
}
