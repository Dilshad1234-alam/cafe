"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-brand-charcoal text-brand-cream">
      
      {/* Decorative Premium Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/3"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="text-sm font-medium text-gray-400 mb-10 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-yellow">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col items-start text-left relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 text-sm font-bold tracking-wide mb-6 backdrop-blur-sm">
              WELCOME TO THE TASTY ZONE
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Good Food.<br/>
              Good Mood.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-cream relative">
                Great Moments.
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-yellow opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              Serving freshly prepared cafe favourites, affordable combos and a welcoming experience for every food lover in Gondia.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/menu" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-2xl font-bold text-lg hover:bg-[#E5A800] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(244,180,0,0.4)]"
              >
                Explore Menu <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href={siteConfig.links.phone}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border-2 border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-brand-yellow transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-brand-yellow" />
                Call Cafe
              </a>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-yellow/20 rounded-full blur-[80px]"></div>
            
            <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex items-center justify-center p-12 group">
              <Image 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                alt="The Tasty Zone Cafe"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
                priority
              />
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 bg-brand-yellow text-brand-charcoal font-black px-4 py-2 rounded-xl rotate-12 shadow-xl animate-bounce">
                Open Daily!
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom curved separator */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" className="opacity-25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="white" className="opacity-50"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
}
