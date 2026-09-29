"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isDiscounted = product.oldPrice && product.oldPrice > product.price;
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const inWishlist = isMounted ? isInWishlist(product.id) : false;

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
      {/* Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        {product.badge ? (
          <span className="bg-cyber-promo text-cyber-main text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
            {product.badge}
          </span>
        ) : (
          <span /> // Spacer
        )}
        
        <button 
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-cyber-promo hover:bg-white shadow-sm opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:-translate-y-2 group-hover:translate-y-0"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-cyber-promo text-cyber-promo' : ''}`} />
        </button>
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square p-6 overflow-hidden bg-white">
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-center"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 border-t border-gray-50">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          {product.brand}
        </div>
        
        <Link href={`/products/${product.slug}`} className="block group-hover:text-cyber-promo transition-colors">
          <h3 className="font-semibold text-cyber-main line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-xl font-extrabold text-cyber-main">
              ${product.price.toFixed(2)}
            </span>
            {isDiscounted && (
              <span className="text-sm font-medium text-gray-400 line-through mb-0.5">
                ${product.oldPrice?.toFixed(2)}
              </span>
            )}
          </div>
          
          {isDiscounted && (
            <div className="text-xs font-semibold text-cyber-promo mb-4">
              Save ${(product.oldPrice! - product.price).toFixed(2)}
            </div>
          )}

          {/* Add to cart CTA */}
          <button 
            className="w-full flex items-center justify-center gap-2 bg-cyber-light hover:bg-cyber-main text-cyber-main hover:text-white font-semibold py-2.5 rounded-lg transition-colors border border-gray-200 hover:border-transparent group-hover:bg-cyber-main group-hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
