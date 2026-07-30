"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Timer } from "lucide-react";

export default function TodaySpecial() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-brand-charcoal rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-brand-charcoal">
          
          {/* Abstract glowing background shapes */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200')] opacity-[0.03] bg-cover bg-center pointer-events-none"></div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[400px] h-[400px] bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            {/* Left Content */}
            <div className="p-8 sm:p-12 lg:p-20 relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-red to-rose-600 text-white rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-brand-red/30">
                <Star className="w-4 h-4 fill-white" />
                Deal of the Day
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                Paneer Loaded <br/> Burger Combo
              </h2>
              
              <p className="text-lg text-gray-300 mb-10 max-w-md leading-relaxed">
                Our spicy Paneer Loaded Burger paired with hot Peri Peri Fries and a classic thick Cold Coffee. The ultimate premium treat.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-12 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md w-fit">
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Exclusive Price</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-brand-yellow leading-none">₹199</span>
                    <span className="text-2xl text-gray-500 font-bold line-through mb-1">₹299</span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-16 bg-white/10"></div>
                <div className="flex items-center gap-3 text-sm font-bold text-white bg-brand-red/20 px-4 py-3 rounded-xl border border-brand-red/30">
                  <Timer className="w-5 h-5 text-brand-red animate-pulse" />
                  Ends tonight <br/> at 11 PM
                </div>
              </div>

              <Link 
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-yellow text-brand-charcoal rounded-2xl font-black text-lg hover:bg-[#E5A800] hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-yellow/20 group"
              >
                Claim Deal Now 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Right Image Composition */}
            <div className="relative h-80 sm:h-[400px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end lg:pr-10 z-10 overflow-hidden lg:overflow-visible p-8 lg:p-0">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-transparent to-transparent z-10 lg:hidden"></div>
              
              <div className="relative w-full h-full max-w-[400px] lg:max-w-none lg:w-[130%] lg:h-[130%] lg:-mr-[15%] lg:translate-y-[5%]">
                <Image 
                  src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800"
                  alt="Premium Paneer Combo"
                  fill
                  className="object-contain lg:object-cover rounded-full lg:rounded-none drop-shadow-2xl"
                  unoptimized
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
