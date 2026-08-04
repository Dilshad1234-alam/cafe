import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import ProductGallery from "@/frontend/components/menu/ProductGallery";
import ProductInfo from "@/frontend/components/menu/ProductInfo";
import ProductPurchasePanel from "@/frontend/components/menu/ProductPurchasePanel";
import RelatedProducts from "@/frontend/components/menu/RelatedProducts";
import { getDiscountPercentage } from "@/frontend/utils/productPricing";
import connectDB from "@/backend/config/db";
import MenuItem from "@/backend/models/MenuItem";
import Category from "@/backend/models/Category";

// Helper function to map DB product to UI format
function mapProductForUI(p, categoriesDb) {
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
    salePrice: p.salePrice || null,
    description: p.description || "",
    shortDescription: p.shortDescription || p.description?.substring(0, 100) || "",
    category: catSlug,
    foodType: p.foodType || "veg",
    image: p.imageUrl || (p.images && p.images[0]) || "",
    images: p.images || (p.imageUrl ? [p.imageUrl] : []),
    isPopular: p.isFeatured || false,
    rating: p.averageRating || 4.5,
    reviewCount: p.reviewCount || 0,
    ingredients: p.ingredients || [],
    tags: p.tags || [],
    sizes: p.sizes || [],
    addOns: p.addOns || [],
    isAvailable: p.isAvailable,
    preparationTime: p.preparationTime || "15 min"
  };
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  await connectDB();
  
  const dbProduct = await MenuItem.findOne({ slug: resolvedParams.slug }).lean();
  
  if (!dbProduct) {
    return {
      title: "Product Not Found | The Tasty Zone",
    };
  }

  return {
    title: `${dbProduct.name} | The Tasty Zone`,
    description: dbProduct.description || dbProduct.shortDescription,
    openGraph: {
      title: `${dbProduct.name} | The Tasty Zone`,
      description: dbProduct.description || dbProduct.shortDescription,
      images: [{ url: dbProduct.imageUrl || (dbProduct.images && dbProduct.images[0]) || "" }],
    }
  };
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  await connectDB();
  const dbProduct = await MenuItem.findOne({ slug }).lean();

  if (!dbProduct) {
    notFound();
  }

  const categoriesDb = await Category.find({ isActive: true }).lean();
  const product = mapProductForUI(dbProduct, categoriesDb);

  // Find related products (same category, exclude current, limit 4, available only)
  const relatedDbProducts = await MenuItem.find({ 
    category: dbProduct.category, 
    _id: { $ne: dbProduct._id },
    isAvailable: true 
  }).limit(4).lean();

  const relatedProducts = relatedDbProducts.map(p => mapProductForUI(p, categoriesDb));

  const discount = getDiscountPercentage(product.originalPrice, product.salePrice);

  return (
    <main className="min-h-screen bg-gray-50/50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link 
            href="/menu"
            className="flex items-center gap-2 text-gray-500 hover:text-brand-charcoal transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>
          
          <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/menu" className="hover:text-brand-charcoal transition-colors">Menu</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-medium truncate max-w-[150px]" aria-current="page">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column: Image */}
          <div>
            <div className="sticky top-32">
              <ProductGallery product={product} discount={discount} />
            </div>
          </div>
          
          {/* Right Column: Info & Purchase */}
          <div>
            <ProductInfo product={product} />
            <ProductPurchasePanel product={product} />
          </div>
          
        </div>

        {/* Related Products */}
        <RelatedProducts relatedProducts={relatedProducts} />
        
      </div>
    </main>
  );
}
