"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getSubtotal } = useCartStore();

  // Handle hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2 text-cyber-main">
            <ShoppingBag className="w-5 h-5" />
            YOUR CART
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-cyber-main"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-gray-50 p-6 rounded-full text-gray-300">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-cyber-main mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">You haven't added anything yet.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-cyber-main text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 text-sm font-medium border border-green-100">
                <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                Item added to cart successfully
              </div>
              
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-50 rounded-md border border-gray-100 p-2 flex-shrink-0">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <Link 
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-semibold text-sm text-cyber-main hover:text-cyber-promo line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-cyber-main font-bold mt-1">
                        ${item.product.price.toFixed(2)}
                      </div>
                      
                      <div className="flex items-center gap-3 mt-auto pt-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-cyber-main">${getSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 text-cyber-main font-bold py-3 rounded-lg transition-colors"
              >
                VIEW CART
              </Link>
              <button 
                onClick={() => alert("Simulation de Checkout : redirection vers la passerelle de paiement (Hors périmètre).")}
                className="flex items-center justify-center gap-2 bg-cyber-promo hover:bg-green-400 text-cyber-main font-bold py-3 rounded-lg transition-colors"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
