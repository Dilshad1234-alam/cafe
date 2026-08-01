"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import CategoryToolbar from '@/frontend/components/admin/categories/CategoryToolbar';
import CategoryTable from '@/frontend/components/admin/categories/CategoryTable';
import CategoryMobileCard from '@/frontend/components/admin/categories/CategoryMobileCard';
import CategoryEmptyState from '@/frontend/components/admin/categories/CategoryEmptyState';
import CategorySkeleton from '@/frontend/components/admin/categories/CategorySkeleton';
import CategoryDialog from '@/frontend/components/admin/categories/CategoryDialog';
import CategoryForm from '@/frontend/components/admin/categories/CategoryForm';
import DeleteCategoryDialog from '@/frontend/components/admin/categories/DeleteCategoryDialog';
import { fetchAdminCategories, updateAdminCategoryStatus } from '@/frontend/services/admin/categoryService';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAdminCategories(searchParams);
      setCategories(data.categories);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [searchParams]);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleStatusToggle = async (category) => {
    try {
      // Optimistic UI update
      setCategories(prev => prev.map(c => 
        c._id === category._id ? { ...c, isActive: !category.isActive } : c
      ));
      
      await updateAdminCategoryStatus(category._id, !category.isActive);
      toast.success(`${category.name} is now ${!category.isActive ? 'Active' : 'Inactive'}`);
    } catch (error) {
      // Revert on failure
      setCategories(prev => prev.map(c => 
        c._id === category._id ? { ...c, isActive: category.isActive } : c
      ));
      toast.error(error.message || "Failed to update status");
    }
  };

  const onFormSuccess = () => {
    setIsFormOpen(false);
    loadCategories();
  };

  const onDeleteSuccess = () => {
    setIsDeleteOpen(false);
    loadCategories();
  };

  const hasFilters = searchParams.has("search") || (searchParams.has("status") && searchParams.get("status") !== "all");

  return (
    <div className="pb-10">
      <AdminPageHeader 
        title="Categories" 
        description="Manage your menu categories and their display order"
      />

      <CategoryToolbar onAddClick={handleAddClick} />

      {isLoading ? (
        <CategorySkeleton />
      ) : categories.length === 0 ? (
        <CategoryEmptyState onAddClick={handleAddClick} hasFilters={hasFilters} />
      ) : (
        <>
          <CategoryTable 
            categories={categories}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onStatusToggle={handleStatusToggle}
          />
          <div className="flex flex-col gap-4 md:hidden">
            {categories.map(category => (
              <CategoryMobileCard 
                key={category._id}
                category={category}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </div>
          
          {/* Pagination Controls - Simple version for now */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              <p>Showing page {pagination.page} of {pagination.totalPages}</p>
            </div>
          )}
        </>
      )}

      {/* Dialogs */}
      <CategoryDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <CategoryForm 
          initialData={selectedCategory} 
          onSuccess={onFormSuccess} 
          onCancel={() => setIsFormOpen(false)} 
        />
      </CategoryDialog>

      <DeleteCategoryDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        category={selectedCategory}
        onSuccess={onDeleteSuccess}
      />
    </div>
  );
}
