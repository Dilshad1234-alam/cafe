"use client";

import Image from "next/image";

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Image Placeholder - Premium Dual Layout */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-brand-cream flex items-center justify-center p-8 group">
            {/* Offset Border Effect */}
            <div className="absolute inset-4 border-2 border-brand-yellow/30 rounded-2xl group-hover:scale-[0.98] transition-transform duration-500 z-10 pointer-events-none"></div>
            
            <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border border-gray-100 z-20">
               <Image 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800"
                alt="Freshly Prepared Food"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
            </div>
            
            {/* Floating Info Tag */}
            <div className="absolute -bottom-6 -right-6 bg-brand-charcoal text-white font-bold px-8 py-6 rounded-2xl shadow-2xl z-30 flex flex-col items-center">
              <span className="text-3xl font-serif text-brand-yellow">100%</span>
              <span className="text-sm tracking-wider uppercase mt-1">Fresh Food</span>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="flex flex-col items-start pl-0 lg:pl-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-charcoal font-bold tracking-widest text-xs uppercase mb-6 shadow-sm border border-brand-yellow/30">
              <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></div>
              Our Story
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-charcoal mb-8 leading-[1.2]">
              Making Everyday Moments <span className="text-brand-yellow italic">More Delicious</span>
            </h2>
            
            <div className="w-20 h-2 bg-brand-yellow rounded-full mb-8"></div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed font-medium">
              The Tasty Zone Cafe was created with a simple idea—to serve tasty, freshly prepared food at prices everyone can enjoy. From burgers and pizzas to momos, fries, shakes and combos, every item is prepared to make everyday moments more delicious.
            </p>
            
            <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-brand-yellow/40 pl-6 my-8 italic">
              "We focus on friendly service, fast takeaway, and reliable delivery to ensure you always get exactly what you are craving."
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Whether it is a quick snack or a family meal, we are here to provide a local customer experience that leaves a smile on your face.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
