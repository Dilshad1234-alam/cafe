import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function MenuHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-charcoal overflow-hidden border-b border-white/5">
      {/* Decorative subtle background overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        <nav className="flex justify-center items-center text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white font-medium" aria-current="page">Menu</span>
        </nav>
        
        {/* Main Heading */}
        <h1 className="font-serif text-4xl md:text-6xl font-black text-brand-yellow mb-6">
          Explore Our Menu
        </h1>
        
        <p className="text-lg md:text-xl text-brand-cream/80 max-w-2xl mx-auto font-medium">
          Freshly prepared burgers, pizzas, momos, fries, shakes and cafe favourites. 
          Crafted with love, served with joy.
        </p>
      </div>
    </section>
  );
}
