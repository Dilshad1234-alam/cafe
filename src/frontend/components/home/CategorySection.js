import Image from "next/image";
import Link from "next/link";
import { categories } from "@/frontend/data/categories";
import { ChevronRight } from "lucide-react";

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-2">Explore Menu</h2>
            <p className="text-gray-500">What are you craving today?</p>
          </div>
          <Link href="/menu" className="hidden sm:flex items-center gap-1 text-brand-charcoal font-semibold hover:text-brand-yellow transition-colors">
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Categories Horizontal Scroll / Grid */}
        <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pb-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/menu?category=${category.slug}`}
              prefetch={false}
              className="group flex flex-col items-center min-w-[120px] sm:min-w-0"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-4 rounded-full overflow-hidden border-4 border-gray-50 shadow-md group-hover:border-brand-yellow group-hover:shadow-brand-yellow/20 transition-all duration-300 group-hover:-translate-y-2">
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 96px, 150px"
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-brand-charcoal text-center group-hover:text-brand-yellow transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{category.label}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 sm:hidden text-center">
          <Link href="/menu" className="inline-flex items-center gap-1 text-brand-charcoal font-semibold hover:text-brand-yellow transition-colors">
            View All Menu <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
