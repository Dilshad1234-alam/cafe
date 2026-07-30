"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function WhyChooseUsAbout() {
  const reasons = [
    "Wide Cafe Menu",
    "Freshly Prepared Orders",
    "Affordable Combos",
    "Takeaway and Delivery",
    "Convenient Opening Hours",
    "Easy Phone and WhatsApp Ordering"
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-brand-charcoal rounded-[3rem] p-10 sm:p-14 md:p-20 relative shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Decorative Corner Lights */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-red/10 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Dotted Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_2px)]" style={{ backgroundSize: "32px 32px" }}></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            
            <div className="w-full lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow font-bold tracking-widest text-xs uppercase mb-6 border border-brand-yellow/30">
                Quality Guaranteed
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Why Choose <br/>
                <span className="text-brand-yellow">The Tasty Zone?</span>
              </h2>
              
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-8">
                We are open every day from {siteConfig.hours}. Give us a call at <strong className="text-white">{siteConfig.formattedPhone}</strong> to place your order.
              </p>
              
              <a href={siteConfig.links.phone} className="inline-flex items-center gap-2 text-brand-yellow font-bold hover:text-white transition-colors group">
                Place an Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {reasons.map((reason, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-brand-yellow group-hover:text-brand-charcoal transition-colors" />
                    </div>
                    <span className="text-gray-100 font-medium group-hover:text-white transition-colors">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
