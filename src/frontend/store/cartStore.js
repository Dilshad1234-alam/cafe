import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateItemKey } from '@/frontend/utils/productPricing';

// Helper to normalize legacy cart items to the new format
const normalizeCartItems = (items) => {
  if (!items || !Array.isArray(items)) return [];
  
  return items.map(item => {
    // If it already has an itemKey, it's a new format item
    if (item.itemKey) return item;
    
    // Otherwise, it's an old item. Generate a basic itemKey based on its id.
    // The old items didn't have size or add-ons configurations.
    const fallbackKey = generateItemKey(item.id);
    
    return {
      ...item,
      itemKey: fallbackKey,
      selectedSize: null,
      selectedAddOns: [],
      // Ensure unitPrice is set for consistent totals calculation
      unitPrice: item.unitPrice || item.salePrice || item.originalPrice
    };
  });
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, config = null) => {
        set((state) => {
          // Extract configuration if provided
          const selectedSize = config?.selectedSize || null;
          const selectedAddOns = config?.selectedAddOns || [];
          
          // Determine the unit price. If configured, use it, otherwise fallback to product price
          const unitPrice = config?.configuredUnitPrice || (product.salePrice || product.originalPrice);
          
          // Generate deterministic key
          const itemKey = generateItemKey(
            product.id, 
            selectedSize?.id, 
            selectedAddOns.map(a => a.id)
          );

          // Find if this exact configuration already exists in the cart
          const existingItemIndex = state.items.findIndex(item => item.itemKey === itemKey);

          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity
            };
            return { items: newItems };
          }
          
          // Add as new cart item
          const newItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            foodType: product.foodType,
            quantity,
            itemKey,
            selectedSize,
            selectedAddOns,
            unitPrice
          };

          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (itemKey) => {
        set((state) => ({
          items: state.items.filter((item) => item.itemKey !== itemKey && item.id !== itemKey), // Fallback for old calls using `id`
        }));
      },
      
      updateQuantity: (itemKey, quantity) => {
        // Enforce boundaries
        const boundedQuantity = Math.max(1, Math.min(20, quantity));
        
        set((state) => ({
          items: state.items.map((item) =>
            // Fallback for old calls using `id` if `itemKey` matches `id`
            item.itemKey === itemKey || item.id === itemKey 
              ? { ...item, quantity: boundedQuantity } 
              : item
          ),
        }));
      },

      incrementQuantity: (itemKey) => {
        set((state) => ({
          items: state.items.map((item) =>
            (item.itemKey === itemKey || item.id === itemKey) && item.quantity < 20
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decrementQuantity: (itemKey) => {
        set((state) => ({
          items: state.items.map((item) =>
            (item.itemKey === itemKey || item.id === itemKey) && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalQuantity: () => get().getTotalItems(), // Alias for new modules
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          // Use the stored unitPrice which accounts for sizes/addons, 
          // or fallback for very old items
          const price = item.unitPrice || item.salePrice || item.originalPrice;
          return total + price * item.quantity;
        }, 0);
      },

      getSubtotal: () => get().getTotalPrice(), // Alias for new modules
    }),
    {
      name: 'tasty-zone-cart',
      // Migration/Normalization step on rehydration
      onRehydrateStorage: () => (state) => {
        if (state && state.items) {
          state.items = normalizeCartItems(state.items);
        }
      },
    }
  )
);
