import Image from "next/image";
import { siteConfig } from "@/frontend/data/siteConfig";

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramGallery() {
  const posts = [
    { id: 1, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600", alt: "Delicious Burger" },
    { id: 2, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600", alt: "Crispy Fries" },
    { id: 3, image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80&w=600", alt: "Spicy Momos" },
    { id: 4, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600", alt: "Cheese Pizza" },
    { id: 5, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600", alt: "Cold Coffee" },
    { id: 6, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=600", alt: "Cafe Offer" },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <a 
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-brand-charcoal hover:text-brand-yellow transition-colors group"
        >
          <InstagramIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <h2 className="font-serif text-2xl md:text-4xl font-bold">@_the_tasty_zone.cafe</h2>
        </a>
        <p className="text-gray-500 mt-4">Follow us on Instagram for daily updates and mouth-watering photos.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {posts.map((post) => (
          <a 
            key={post.id} 
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group block"
          >
            <Image 
              src={post.image}
              alt={post.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <InstagramIcon className="w-8 h-8 text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
