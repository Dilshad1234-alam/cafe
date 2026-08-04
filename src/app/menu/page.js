import { Suspense } from "react";
import MenuPageClient from "./MenuPageClient";
import connectDB from "@/backend/config/db";
import Category from "@/backend/models/Category";
import MenuItem from "@/backend/models/MenuItem";

export const metadata = {
  title: "Menu | The Tasty Zone",
  description: "Explore our freshly prepared burgers, pizzas, momos, fries, and cafe favourites at The Tasty Zone.",
};

export default async function MenuPage() {
  await connectDB();

  // Fetch active categories
  const categoriesDb = await Category.find({ isActive: true }).sort("sortOrder").lean();
  
  // Map categories for UI
  const categories = categoriesDb
    .filter(c => !['maggi', 'biryani'].includes(c.slug.toLowerCase()) && !c.name.toLowerCase().includes('maggi') && !c.name.toLowerCase().includes('biryani'))
    .map(c => ({
    id: c._id.toString(),
    slug: c.slug,
    name: c.name,
    image: c.image || ""
  }));

  // Fetch available products
  const productsDb = await MenuItem.find({ isAvailable: true }).lean();

  // Map products for UI (maintaining backward compatibility with existing mock structure)
  const products = productsDb
    .filter(p => {
      const isMaggi = p.category?.toString().toLowerCase().includes('maggi') || p.slug.toLowerCase().includes('maggi') || p.name.toLowerCase().includes('maggi');
      const isBiryani = p.category?.toString().toLowerCase().includes('biryani') || p.slug.toLowerCase().includes('biryani') || p.name.toLowerCase().includes('biryani');
      return !isMaggi && !isBiryani;
    })
    .map(p => {
    // Determine category slug (fallback if category field is somehow missing or different)
    let catSlug = p.category;
    if (p.category?.toString().match(/^[0-9a-fA-F]{24}$/)) {
      const foundCat = categoriesDb.find(c => c._id.toString() === p.category.toString());
      if (foundCat) catSlug = foundCat.slug;
    }

    return {
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      price: p.salePrice || p.basePrice || p.price || 0,
      originalPrice: p.basePrice || p.price || 0,
      description: p.description || "",
      shortDescription: p.shortDescription || p.description?.substring(0, 100) || "",
      category: catSlug,
      foodType: p.foodType || "veg",
      image: p.imageUrl || (p.images && p.images[0]) || "",
      isPopular: p.isFeatured || false,
      rating: 4.5, // Default for now
      reviewCount: 0, // Default for now
      ingredients: p.ingredients || [],
      tags: p.tags || [],
      sizes: p.sizes || [],
      addOns: p.addOns || [],
    };
  });

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading menu...</div>}>
      <MenuPageClient initialProducts={products} initialCategories={categories} />
    </Suspense>
  );
}
