"use client";

import { siteConfig } from "@/frontend/data/siteConfig";
import { Coffee, ShoppingBag, Smartphone, MapPin, Clock, PhoneCall, MessageCircle } from "lucide-react";

export default function CafeExperience() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-charcoal text-brand-yellow font-bold tracking-widest text-xs uppercase mb-6 shadow-sm">
            Our Promise
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-charcoal mb-6">
            More Than Just a Meal
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Whether you are meeting friends, ordering an evening snack or enjoying a quick takeaway, The Tasty Zone Cafe aims to make every order simple, satisfying and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 rounded-full flex items-center justify-center mb-6 border border-brand-yellow/20">
              <Coffee className="w-8 h-8 text-brand-yellow" />
            </div>
            <h3 className="font-bold text-2xl text-brand-charcoal mb-4">Relaxed Cafe Experience</h3>
            <p className="text-gray-500 leading-relaxed">Enjoy your favourite meals in a comfortable and welcoming environment.</p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-red/10 to-transparent rounded-full flex items-center justify-center mb-6 border border-brand-red/10">
              <ShoppingBag className="w-8 h-8 text-brand-red" />
            </div>
            <h3 className="font-bold text-2xl text-brand-charcoal mb-4">Quick Takeaway</h3>
            <p className="text-gray-500 leading-relaxed">In a hurry? Grab your freshly packed order and enjoy it on the go.</p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full flex items-center justify-center mb-6 border border-blue-500/10">
              <Smartphone className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-bold text-2xl text-brand-charcoal mb-4">Easy Ordering</h3>
            <p className="text-gray-500 leading-relaxed">Order via call or WhatsApp. We deliver straight to your doorstep.</p>
          </div>

        </div>

        {/* Premium Business Information Box */}
        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-12 md:p-16 lg:p-20 bg-brand-charcoal text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_2px)]" style={{ backgroundSize: "32px 32px" }}></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="font-serif text-4xl md:text-5xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">Visit Us Today</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors">
                      <MapPin className="w-6 h-6 text-brand-yellow group-hover:text-brand-charcoal transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-white">{siteConfig.name}</h4>
                      <p className="text-gray-400 leading-relaxed">{siteConfig.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors">
                      <Clock className="w-6 h-6 text-brand-yellow group-hover:text-brand-charcoal transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-white">Opening Hours</h4>
                      <p className="text-gray-400 leading-relaxed">Everyday: {siteConfig.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left bg-gradient-to-br from-white to-gray-50">
              <h4 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Get In Touch</h4>
              <p className="text-gray-500 mb-10 max-w-sm text-lg">
                Takeaway and delivery available. Reach out to us for orders or queries.
              </p>
              
              <div className="flex flex-col w-full sm:w-auto gap-5">
                <a 
                  href={siteConfig.links.phone}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-brand-charcoal text-white rounded-2xl font-bold text-lg hover:bg-gray-800 hover:shadow-lg transition-all"
                >
                  <PhoneCall className="w-6 h-6 text-brand-yellow" />
                  Call {siteConfig.formattedPhone}
                </a>
                
                <a 
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white rounded-2xl font-bold text-lg hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp Us
                </a>

                <a 
                  href={siteConfig.links.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-gray-100 text-brand-charcoal rounded-2xl font-bold text-lg hover:border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <MapPin className="w-6 h-6 text-gray-400" />
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
