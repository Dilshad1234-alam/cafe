"use client";

import React from 'react';
import ProductForm from '@/frontend/components/admin/products/ProductForm';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';

export default function NewProductPage() {
  return (
    <div className="pb-10">
      <AdminPageHeader 
        title="Add New Product" 
        description="Create a new menu item for your cafe"
      />
      
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
