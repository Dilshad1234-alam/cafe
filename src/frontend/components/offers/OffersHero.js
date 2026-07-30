"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TicketPercent } from "lucide-react";

export default function OffersHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-brand-charcoal text-brand-cream border-b-8 border-brand-yellow">
      {/* Background Decorative Blob & Grid */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200')] opacity-5 bg-cover bg-center pointer-events-none"></div>
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 text-sm font-bold tracking-wide mb-6">
              <TicketPercent className="w-4 h-4" />
              EXCLUSIVE DEALS
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Taste the <br />
              <span className="text-brand-yellow relative inline-block">
                Magic.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-red" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed mb-10">
              Unlock mouth-watering combos, weekend specials, and unbeatable discounts curated just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="#deals" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-black hover:bg-[#E5A800] hover:-translate-y-1 transition-all shadow-xl shadow-brand-yellow/20 flex items-center justify-center gap-2"
              >
                View Deals <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/menu" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
              >
                Full Menu
              </Link>
            </div>
          </div>

          {/* Right Floating Images Composition */}
          <div className="w-full lg:w-1/2 relative hidden md:block">
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              
              {/* Main Burger Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-20 animate-[bounce_6s_ease-in-out_infinite]">
                <Image 
                  src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800"
                  alt="Premium Burger"
                  fill
                  className="object-cover rounded-full border-8 border-brand-charcoal shadow-[0_0_50px_rgba(244,180,0,0.3)]"
                  unoptimized
                  priority
                />
              </div>

              {/* Secondary Fries Image */}
              <div className="absolute top-10 right-0 w-48 h-48 z-10 animate-[bounce_5s_ease-in-out_infinite_reverse]">
                <Image 
                  src="https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800"
                  alt="Crispy Fries"
                  fill
                  className="object-cover rounded-full border-4 border-brand-charcoal shadow-2xl"
                  unoptimized
                />
              </div>

              {/* Floating Discount Tag */}
              <div className="absolute bottom-20 left-10 z-30 bg-brand-red text-white p-4 rounded-2xl shadow-xl shadow-brand-red/30 -rotate-12 animate-[pulse_3s_ease-in-out_infinite]">
                <span className="block text-3xl font-black leading-none mb-1">20%</span>
                <span className="block text-sm font-bold uppercase tracking-wider">Extra Off</span>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
