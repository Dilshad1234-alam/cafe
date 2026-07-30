"use client";

import { Leaf, ShieldCheck, Wallet, Smile } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      id: 1,
      icon: Leaf,
      title: "Fresh Preparation",
      description: "Food prepared carefully with freshness and taste in mind."
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Hygiene First",
      description: "A clean preparation process and responsible food handling."
    },
    {
      id: 3,
      icon: Wallet,
      title: "Affordable Taste",
      description: "Cafe favourites and satisfying combos at accessible prices."
    },
    {
      id: 4,
      icon: Smile,
      title: "Friendly Service",
      description: "A welcoming experience for takeaway, delivery and dine-in customers."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-brand-cream relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[80px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-yellow/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-charcoal mb-6">
            Our Core Values
          </h2>
          <div className="w-24 h-2 bg-brand-yellow mx-auto rounded-full shadow-[0_0_15px_rgba(244,180,0,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div 
                key={val.id}
                className="group bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-brand-yellow/10 border border-white hover:border-brand-yellow/30 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
              >
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-brand-charcoal transition-colors duration-500 border border-gray-100 group-hover:border-transparent">
                    <Icon className="w-10 h-10 text-brand-yellow group-hover:text-brand-charcoal transition-colors duration-500" />
                  </div>
                  <h3 className="font-bold text-brand-charcoal text-2xl mb-4">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
