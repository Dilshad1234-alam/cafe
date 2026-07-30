"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, Clock } from "lucide-react";

export default function OfferCard({ offer }) {
  return (
    <div className="relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full">
      
      {/* Discount Badge Floating */}
      <div className="absolute top-5 right-5 z-20">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-red blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <span className="relative px-4 py-2 bg-brand-red text-white text-sm font-black rounded-xl flex items-center gap-1.5 shadow-sm">
            <Tag className="w-4 h-4" />
            {offer.discountText}
          </span>
        </div>
      </div>

      {/* Image Section (Edge-to-Edge) */}
      <div className="relative h-56 w-full bg-gray-900 overflow-hidden">
        <Image 
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          unoptimized
        />
        {/* Bottom Gradient for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Dashed Separator (Ticket Vibe) */}
      <div className="relative flex items-center justify-center -mt-3 z-10 px-6">
        <div className="w-6 h-6 rounded-full bg-gray-50 absolute -left-3 shadow-inner"></div>
        <div className="w-full border-t-2 border-dashed border-gray-200"></div>
        <div className="w-6 h-6 rounded-full bg-gray-50 absolute -right-3 shadow-inner"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative z-10 pt-4">
        <h3 className="font-serif font-bold text-brand-charcoal text-2xl leading-tight mb-3 group-hover:text-brand-yellow transition-colors">
          {offer.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
          {offer.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-red bg-red-50 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            {offer.validity}
          </div>
          
          <Link 
            href="/menu"
            className="w-10 h-10 rounded-full bg-brand-charcoal text-brand-yellow flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-charcoal transition-colors shadow-md"
            aria-label={offer.buttonText}
          >
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
