"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [isPending, startTransition] = useTransition();

  // Create an "All" category to prepend
  const allCategories = [
    { id: "all", slug: "all", name: "All Items" },
    ...categories
  ];

  const handleCategoryClick = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    
    startTransition(() => {
      router.push(`/menu?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide pt-4">
      <div className="flex gap-3 px-4 md:px-0 min-w-max">
        {allCategories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`
                px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap
                ${isActive 
                  ? "bg-brand-charcoal text-brand-yellow shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-yellow hover:text-brand-charcoal"
                }
              `}
              aria-pressed={isActive}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
