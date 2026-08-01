"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/frontend/components/admin/products/ProductForm';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import { fetchAdminProduct } from '@/frontend/services/admin/productService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id;
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAdminProduct(id)
        .then(data => {
          setProduct(data);
          setIsLoading(false);
        })
        .catch(error => {
          toast.error(error.message || "Failed to load product");
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <AdminPageHeader 
        title="Edit Product" 
        description={`Editing "${product.name}"`}
      />
      
      <div className="mt-6">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
