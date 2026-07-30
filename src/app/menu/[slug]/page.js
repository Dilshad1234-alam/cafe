import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { menuProducts } from "@/frontend/data/menuProducts";
import ProductGallery from "@/frontend/components/menu/ProductGallery";
import ProductInfo from "@/frontend/components/menu/ProductInfo";
import ProductPurchasePanel from "@/frontend/components/menu/ProductPurchasePanel";
import RelatedProducts from "@/frontend/components/menu/RelatedProducts";
import { getDiscountPercentage } from "@/frontend/utils/productPricing";

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  // Await params as required by Next.js in some contexts, but not strictly needed here if we destructure
  // Next 15+ may require `await params` but we're on Next 16. App Router params are often Promises in new versions.
  // To be safe against Next.js breaking changes, we'll assume it's synchronous or we can await it if needed.
  // Let's use `const resolvedParams = await params;` if the user's setup enforces it, but standard is fine.
  
  const product = menuProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found | The Tasty Zone",
    };
  }

  return {
    title: `${product.name} | The Tasty Zone`,
    description: product.description,
    openGraph: {
      title: `${product.name} | The Tasty Zone`,
      description: product.description,
      images: [{ url: product.image }],
    }
  };
}

export default function ProductDetailsPage({ params }) {
  const { slug } = params;
  const product = menuProducts.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products (same category, exclude current, limit 4, available only)
  const relatedProducts = menuProducts
    .filter(p => p.category === product.category && p.id !== product.id && p.isAvailable)
    .slice(0, 4);

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
