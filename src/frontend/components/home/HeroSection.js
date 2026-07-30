import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/frontend/data/siteConfig";
import { Phone, ArrowRight, Clock, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-brand-cream">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-yellow/20 rounded-full blur-3xl opacity-50 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/20 text-brand-charcoal text-sm font-semibold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
              </span>
              Takeaway & Delivery Available
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-charcoal leading-[1.1] mb-6">
              Fresh Taste.<br />
              <span className="text-brand-yellow">Happy Moments.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Burgers, pizzas, momos, fries, shakes and more—freshly prepared for takeaway and delivery in Gondia.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-charcoal border-2 border-gray-100 rounded-xl font-bold hover:border-brand-yellow hover:bg-brand-yellow/5 transition-colors flex items-center justify-center"
              >
                Explore Menu
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-yellow" />
                {siteConfig.hours}
              </div>
              <div className="flex items-center gap-2">
                <a href={siteConfig.links.phone} className="flex items-center gap-2 hover:text-brand-charcoal transition-colors">
                  <div className="p-1.5 bg-brand-yellow/20 rounded-full text-brand-charcoal">
                    <Phone className="w-4 h-4" />
                  </div>
                  {siteConfig.formattedPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-brand-yellow rounded-full scale-[0.85] shadow-2xl shadow-brand-yellow/30"></div>
              <Image 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80"
                alt="Delicious classic veg burger"
                fill
                className="object-cover rounded-full p-2"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
                unoptimized
              />
              
              {/* Floating Element 1 */}
              <div className="absolute top-[10%] -left-[5%] bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 flex items-center gap-3 animate-[bounce_4s_ease-in-out_infinite]">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex text-brand-yellow">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <p className="text-xs font-bold text-brand-charcoal">2k+ Happy Customers</p>
                </div>
              </div>
              
              {/* Floating Element 2 */}
              <div className="absolute bottom-[15%] -right-[5%] bg-white px-5 py-3 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col items-center animate-[bounce_5s_ease-in-out_infinite_reverse]">
                <span className="text-sm font-medium text-gray-500">Delivery in</span>
                <span className="text-xl font-black text-brand-charcoal">30 Mins</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
