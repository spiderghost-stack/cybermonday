import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((p) => p.id === product.id);
        
        if (existingItem) {
          set({ items: items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some((p) => p.id === productId);
      },
    }),
    {
      name: 'cyber-monday-wishlist',
    }
  )
);
