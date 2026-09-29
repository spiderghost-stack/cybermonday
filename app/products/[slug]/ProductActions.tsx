"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inWishlist = isMounted ? isInWishlist(product.id) : false;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border-2 border-gray-200 rounded-lg h-14 w-full sm:w-32 justify-between px-2">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-2 text-gray-500 hover:text-cyber-main transition-colors"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg">{quantity}</span>
        <button 
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          className="p-2 text-gray-500 hover:text-cyber-main transition-colors"
          disabled={quantity >= product.stock}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <button 
        onClick={() => addItem(product, quantity)}
        className="flex-1 bg-cyber-main hover:bg-gray-800 text-white font-bold h-14 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        ADD TO CART
      </button>

      <button 
        onClick={() => toggleItem(product)}
        className={`h-14 px-6 rounded-lg border-2 font-bold flex items-center justify-center gap-2 transition-colors ${
          inWishlist 
            ? 'border-cyber-promo text-cyber-promo bg-green-50' 
            : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Heart className={`w-5 h-5 ${inWishlist ? 'fill-cyber-promo' : ''}`} />
        <span className="hidden sm:inline">{inWishlist ? 'SAVED' : 'SAVE'}</span>
      </button>
    </div>
  );
}
