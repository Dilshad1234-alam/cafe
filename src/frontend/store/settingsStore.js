import { create } from 'zustand';
import { fetchPublicSettings } from '../services/publicSettingsService';
import { siteConfig } from '../data/siteConfig';

export const useSettingsStore = create((set) => ({
  settings: null,
  isLoading: true,
  fetchSettings: async () => {
    try {
      const data = await fetchPublicSettings();
      if (data) {
        set({ settings: data, isLoading: false });
      } else {
        set({ settings: null, isLoading: false }); // Fallback to siteConfig in components
      }
    } catch (error) {
      console.error("Failed to fetch settings store", error);
      set({ settings: null, isLoading: false });
    }
  }
}));
