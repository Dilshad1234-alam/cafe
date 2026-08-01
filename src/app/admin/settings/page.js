"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteSettingSchema } from '@/backend/validations/siteSettingValidation';
import { fetchAdminSettings, updateAdminSettings } from '@/frontend/services/admin/settingsService';
import { toast } from 'sonner';

import AdminPageHeader from '@/frontend/components/admin/layout/AdminPageHeader';
import SettingsTabs from '@/frontend/components/admin/settings/SettingsTabs';
import BusinessSettingsForm from '@/frontend/components/admin/settings/BusinessSettingsForm';
import OrderingSettingsForm from '@/frontend/components/admin/settings/OrderingSettingsForm';
import SocialSettingsForm from '@/frontend/components/admin/settings/SocialSettingsForm';
import AppearanceSettingsForm from '@/frontend/components/admin/settings/AppearanceSettingsForm';
import SettingsSaveBar from '@/frontend/components/admin/settings/SettingsSaveBar';
import SettingsSkeleton from '@/frontend/components/admin/settings/SettingsSkeleton';
import SettingsErrorState from '@/frontend/components/admin/settings/SettingsErrorState';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(siteSettingSchema),
    mode: 'onChange'
  });

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAdminSettings();
      // Ensure we set all required fields to valid defaults if missing
      reset(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const updated = await updateAdminSettings(data);
      reset(updated); // Resets isDirty to false and updates form with confirmed server data
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      if (err.errors) {
        // Server validation errors
        toast.error("Please fix the validation errors.");
      } else {
        toast.error(err.message || "Failed to save settings");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pb-28">
      <AdminPageHeader 
        title="Website Settings" 
        subtitle="Manage business information, ordering rules, and site appearance"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {isLoading ? (
          <SettingsSkeleton />
        ) : error ? (
          <SettingsErrorState error={error} onRetry={loadSettings} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-6">
              <div className={activeTab === 'business' ? 'block' : 'hidden'}>
                <BusinessSettingsForm register={register} errors={errors} control={control} />
              </div>
              <div className={activeTab === 'ordering' ? 'block' : 'hidden'}>
                <OrderingSettingsForm register={register} errors={errors} control={control} />
              </div>
              <div className={activeTab === 'social' ? 'block' : 'hidden'}>
                <SocialSettingsForm register={register} errors={errors} />
              </div>
              <div className={activeTab === 'appearance' ? 'block' : 'hidden'}>
                <AppearanceSettingsForm register={register} errors={errors} watch={watch} />
              </div>
            </div>

            <SettingsSaveBar isDirty={isDirty} isSaving={isSaving} onSave={handleSubmit(onSubmit)} />

          </form>
        )}
      </div>
    </main>
  );
}
