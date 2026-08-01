"use client";

import { siteConfig } from "@/frontend/data/siteConfig";
import { MapPin, Phone, Clock, Navigation, MessageCircle } from "lucide-react";
import { useSettingsStore } from "@/frontend/store/settingsStore";

export default function LocationSection() {
  const { settings } = useSettingsStore();

  const businessName = settings?.business?.name || siteConfig.name;
  const address = settings?.business?.addressLine || siteConfig.address;
  const phone = settings?.business?.phone || siteConfig.phone;
  const phoneUrl = settings?.business?.phone ? `tel:${settings.business.phone.replace(/[^0-9+]/g, '')}` : siteConfig.links.phone;
  
  const hours = settings?.business?.openingHours && settings?.business?.closingHours 
    ? `${settings.business.openingHours} to ${settings.business.closingHours}`
    : siteConfig.hours;
    
  const whatsappUrl = settings?.social?.whatsappNumber ? `https://wa.me/${settings.social.whatsappNumber}` : siteConfig.links.whatsapp;
  const googleMapsUrl = settings?.social?.googleMapsUrl || siteConfig.links.googleMaps;
  return (
    <section className="py-20 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-brand-charcoal/5">
          
          {/* Contact Details */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 text-brand-charcoal text-sm font-semibold mb-6 w-fit">
              Visit Us
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-charcoal mb-8">Drop by for a bite.</h2>
            
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-cream rounded-xl text-brand-charcoal shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Address</h3>
                  <p className="text-gray-600">{address}</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-cream rounded-xl text-brand-charcoal shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Opening Hours</h3>
                  <p className="text-gray-600">{hours}</p>
                  <p className="text-sm text-brand-red font-medium mt-1">Takeaway and Delivery Available</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="p-3 bg-brand-cream rounded-xl text-brand-charcoal shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                  <a href={phoneUrl} className="text-gray-600 hover:text-brand-yellow transition-colors block">
                    {phone}
                  </a>
                </div>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={whatsappUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a 
                href={phoneUrl} 
                className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-brand-charcoal text-brand-charcoal font-bold rounded-xl hover:bg-brand-charcoal hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-gray-100 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-xl border border-white max-w-sm w-full">
              <MapPin className="w-12 h-12 text-brand-red mx-auto mb-4" />
              <h3 className="font-bold text-xl text-brand-charcoal mb-2">{businessName}</h3>
              <p className="text-gray-500 text-sm mb-6">{address}</p>
              {googleMapsUrl && (
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors w-full justify-center"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
