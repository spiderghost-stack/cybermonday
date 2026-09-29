"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ecommerce/ProductCard";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items } = useWishlistStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-cyber-light min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-cyber-promo fill-cyber-promo" />
          <h1 className="text-3xl font-extrabold text-cyber-main tracking-tight">Your Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center flex flex-col items-center">
            <div className="bg-red-50 p-6 rounded-full mb-6">
              <Heart className="w-16 h-16 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-cyber-main mb-2">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-gray-500 mb-8 max-w-md">Save products you love and find them here later.</p>
            <Link 
              href="/deals"
              className="bg-cyber-main text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              EXPLORE DEALS
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 mb-6">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
