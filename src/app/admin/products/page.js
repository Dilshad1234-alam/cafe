"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import ProductFilters from '@/frontend/components/admin/products/ProductFilters';
import ProductTable from '@/frontend/components/admin/products/ProductTable';
import ProductMobileCard from '@/frontend/components/admin/products/ProductMobileCard';
import ProductEmptyState from '@/frontend/components/admin/products/ProductEmptyState';
import DeleteProductDialog from '@/frontend/components/admin/products/DeleteProductDialog';
import { fetchAdminProducts, updateAdminProductAvailability, updateAdminProductFeatured } from '@/frontend/services/admin/productService';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchAdminProducts(searchParams);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleStatusToggle = async (product) => {
    try {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isAvailable: !product.isAvailable } : p));
      await updateAdminProductAvailability(product._id, !product.isAvailable);
      toast.success(`${product.name} is now ${!product.isAvailable ? 'Available' : 'Unavailable'}`);
    } catch (error) {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isAvailable: product.isAvailable } : p));
      toast.error(error.message || "Failed to update availability");
    }
  };

  const handleFeaturedToggle = async (product) => {
    try {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isFeatured: !product.isFeatured } : p));
      await updateAdminProductFeatured(product._id, !product.isFeatured);
      toast.success(`${product.name} is ${!product.isFeatured ? 'now Featured' : 'no longer Featured'}`);
    } catch (error) {
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, isFeatured: product.isFeatured } : p));
      toast.error(error.message || "Failed to update featured status");
    }
  };

  const onDeleteSuccess = () => {
    setIsDeleteOpen(false);
    loadProducts();
  };

  const hasFilters = searchParams.has("search") || 
                     (searchParams.has("category") && searchParams.get("category") !== "all") ||
                     (searchParams.has("foodType") && searchParams.get("foodType") !== "all") ||
                     (searchParams.has("status") && searchParams.get("status") !== "all");

  return (
    <div className="pb-10">
      <AdminPageHeader 
        title="Products" 
        description="Manage your menu items, pricing, and availability"
      />

      <ProductFilters />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
        </div>
      ) : products.length === 0 ? (
        <ProductEmptyState hasFilters={hasFilters} />
      ) : (
        <>
          <ProductTable 
            products={products}
            onDelete={handleDeleteClick}
            onStatusToggle={handleStatusToggle}
            onFeaturedToggle={handleFeaturedToggle}
          />
          <div className="flex flex-col gap-4 lg:hidden">
            {products.map(product => (
              <ProductMobileCard 
                key={product._id}
                product={product}
                onDelete={handleDeleteClick}
                onStatusToggle={handleStatusToggle}
                onFeaturedToggle={handleFeaturedToggle}
              />
            ))}
          </div>
          
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              <p>Showing page {pagination.page} of {pagination.totalPages}</p>
            </div>
          )}
        </>
      )}

      <DeleteProductDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        product={selectedProduct}
        onSuccess={onDeleteSuccess}
      />
    </div>
  );
}
