import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { menuProducts } from '@/frontend/data/menuProducts';

export function useMenuFilters() {
  const searchParams = useSearchParams();

  // Read URL parameters safely
  const searchQuery = searchParams.get('search')?.toLowerCase().trim() || '';
  const categoryParam = searchParams.get('category') || 'all';
  const foodTypeParam = searchParams.get('foodType') || 'all';
  const priceParam = searchParams.get('price') || 'all';
  const sortParam = searchParams.get('sort') || 'recommended';
  const popularOnly = searchParams.get('popular') === 'true';
  const offersOnly = searchParams.get('offers') === 'true';

  // Compute filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...menuProducts];

    // 1. Filter by Availability (always exclude unavailable items from listings)
    result = result.filter(item => item.isAvailable !== false);

    // 2. Filter by Category
    if (categoryParam !== 'all') {
      result = result.filter(item => item.category === categoryParam);
    }

    // 3. Filter by Food Type (veg/non-veg)
    if (foodTypeParam !== 'all') {
      result = result.filter(item => item.foodType === foodTypeParam);
    }

    // 4. Filter by Quick Filters (Popular / Offers)
    if (popularOnly) {
      result = result.filter(item => item.isPopular);
    }
    if (offersOnly) {
      result = result.filter(item => item.originalPrice > item.salePrice);
    }

    // 5. Filter by Price Range
    if (priceParam !== 'all') {
      result = result.filter(item => {
        const price = item.salePrice || item.originalPrice;
        if (priceParam === 'under-100') return price < 100;
        if (priceParam === '100-199') return price >= 100 && price <= 199;
        if (priceParam === '200-299') return price >= 200 && price <= 299;
        if (priceParam === '300-plus') return price >= 300;
        return true;
      });
    }

    // 6. Filter by Search Query
    if (searchQuery) {
      result = result.filter(item => {
        return (
          item.name.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.shortDescription.toLowerCase().includes(searchQuery) ||
          item.categoryName.toLowerCase().includes(searchQuery) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery))) ||
          (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery)))
        );
      });
    }

    // 7. Sort Results
    switch (sortParam) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        // Sort popular items to top, then by rating
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.rating - a.rating;
        });
        break;
      case 'recommended':
      default:
        // Default sort: Popular items first, then by rating, then by review count
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviewCount - a.reviewCount;
        });
        break;
    }

    return result;
  }, [
    searchQuery,
    categoryParam,
    foodTypeParam,
    priceParam,
    sortParam,
    popularOnly,
    offersOnly
  ]);

  return {
    products: filteredProducts,
    totalResults: filteredProducts.length
  };
}
