import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-brand-yellow relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 border-4 border-brand-charcoal/10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 border-8 border-brand-charcoal/5 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl font-black text-brand-charcoal mb-6 leading-tight">
          Hungry? Your favourite food is just a click away.
        </h2>
        <p className="text-xl text-brand-charcoal/80 mb-10 font-medium max-w-2xl mx-auto">
          Order online for fast takeaway or delivery. Hot, fresh, and exactly how you like it.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/menu"
            className="w-full sm:w-auto px-10 py-5 bg-brand-charcoal text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl shadow-brand-charcoal/20 flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            Order Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
