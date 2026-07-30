"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function ContactCTA() {
  return (
    <section className="py-24 bg-brand-yellow text-brand-charcoal text-center relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_center,_#161616_2px,_transparent_2px)]" style={{ backgroundSize: "32px 32px" }}></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-black mb-8">
          Ready to order your favourite food?
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            Explore Menu <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white text-brand-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
