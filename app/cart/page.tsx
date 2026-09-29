"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, ArrowLeft, Lock } from "lucide-react";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal, getSavings } = useCartStore();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = getSubtotal();
  const savings = getSavings();
  const total = subtotal; // Assuming free shipping

  return (
    <div className="bg-cyber-light min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-cyber-main mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center flex flex-col items-center shadow-sm">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-cyber-main mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven&apos;t added anything to your cart yet. Explore our deals and find something you&apos;ll love.</p>
            <Link 
              href="/deals"
              className="bg-cyber-promo text-cyber-main font-bold px-8 py-3 rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-bold text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4">
                      
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 bg-gray-50 rounded-lg border border-gray-100 p-2 flex-shrink-0 flex items-center justify-center">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link href={`/products/${item.product.slug}`} className="font-bold text-cyber-main hover:text-cyber-promo transition-colors line-clamp-2 mb-1">
                            {item.product.name}
                          </Link>
                          <span className="text-sm text-gray-500 mb-2">Brand: {item.product.brand}</span>
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 w-fit"
                          >
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price (Desktop) */}
                      <div className="hidden sm:block sm:col-span-2 text-center font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </div>

                      {/* Quantity & Mobile Price */}
                      <div className="sm:col-span-2 flex items-center justify-between sm:justify-center mt-2 sm:mt-0">
                        <span className="sm:hidden font-bold text-gray-900">${item.product.price.toFixed(2)}</span>
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="sm:col-span-2 text-right font-extrabold text-lg text-cyber-main mt-2 sm:mt-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <Link href="/deals" className="text-cyber-main font-medium hover:text-cyber-promo flex items-center gap-2 w-fit">
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-cyber-main mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Original Price</span>
                    <span>${(subtotal + savings).toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium text-sm">FREE</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-cyber-main">Total</span>
                    <span className="font-extrabold text-3xl text-cyber-main">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right mt-1">Taxes calculated at checkout</p>
                </div>

                <button 
                  onClick={() => alert("Simulation de Checkout : redirection vers la passerelle de paiement (Hors périmètre).")}
                  className="w-full bg-cyber-main hover:bg-gray-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
                >
                  <Lock className="w-4 h-4" />
                  SECURE CHECKOUT
                </button>
                
                <div className="text-center text-xs text-gray-400">
                  By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
