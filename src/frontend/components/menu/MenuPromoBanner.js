import Link from "next/link";
import { Coffee, Pizza, Tag } from "lucide-react";

export default function MenuPromoBanner() {
  return (
    <div className="my-16 bg-gradient-to-r from-brand-yellow to-[#F8D254] rounded-2xl p-8 md:p-12 shadow-lg shadow-brand-yellow/20 relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute left-0 bottom-0 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/30 text-brand-charcoal rounded-full text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Tag className="w-3.5 h-3.5" /> Special Deal
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-2">
            Make it a combo!
          </h2>
          <p className="text-brand-charcoal/80 font-medium max-w-lg">
            Add crispy peri-peri fries and a thick cold coffee to complete your meal and save up to 20%.
          </p>
        </div>
        
        <div className="shrink-0 flex items-center justify-center gap-4">
          <div className="hidden sm:flex gap-4 opacity-50 text-brand-charcoal">
            <Pizza className="w-12 h-12" />
            <span className="text-3xl font-black">+</span>
            <Coffee className="w-12 h-12" />
          </div>
          <Link 
            href="/menu?category=combos"
            className="px-8 py-4 bg-brand-charcoal text-white rounded-xl font-bold shadow-xl shadow-brand-charcoal/20 hover:-translate-y-1 hover:bg-gray-900 transition-all ml-4"
          >
            View Combos
          </Link>
        </div>
      </div>
    </div>
  );
}
