"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, X, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { logoutAction } from "@/lib/actions/auth";
import type { User } from "@supabase/supabase-js";

interface HeaderClientProps {
  user: User | null;
  profile: { first_name: string | null; last_name: string | null; role: string } | null;
}

export default function HeaderClient({ user, profile }: HeaderClientProps) {
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { getTotalItems, setIsOpen: setCartOpen } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMounted(true); }, []);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : user?.email?.split("@")[0] ?? "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-cyber-white">
      {/* Top Promo Bar */}
      {isPromoVisible && (
        <div className="bg-cyber-promo px-4 py-2 text-cyber-main flex justify-between items-center text-sm font-medium">
          <div className="flex-1 text-center">
            🔥 Cyber Monday — Les offres arrivent bientôt.{" "}
            <Link href="/deals" className="underline ml-2 hidden sm:inline-block">Voir les offres →</Link>
          </div>
          <button onClick={() => setIsPromoVisible(false)} className="text-cyber-main hover:opacity-70 transition-opacity" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-cyber-main p-2" aria-label="Ouvrir le menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-2xl tracking-tighter text-cyber-main">
              CYBER<span className="text-cyber-promo">MONDAY</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 ml-10">
            <Link href="/deals" className="text-cyber-main hover:text-cyber-promo font-medium transition-colors">Shop</Link>
            <Link href="/deals" className="text-cyber-main hover:text-cyber-promo font-medium transition-colors flex items-center gap-1">
              Deals <span className="bg-cyber-accent text-cyber-main text-[10px] font-bold px-1.5 py-0.5 rounded-sm">HOT</span>
            </Link>
            <Link href="/#categories" className="text-cyber-main hover:text-cyber-promo font-medium transition-colors">Categories</Link>
            <Link href="/deals" className="text-cyber-main hover:text-cyber-promo font-medium transition-colors">New Arrivals</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm lg:max-w-lg mx-4 lg:mx-8 relative z-50">
            <div className={`relative flex items-center transition-all ${isSearchFocused ? "ring-2 ring-cyber-promo rounded-xl" : ""}`}>
              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="w-full bg-cyber-light border border-transparent rounded-xl py-2.5 pl-4 pr-10 text-sm outline-none transition-all focus:bg-white focus:shadow-lg"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <button className="absolute right-3 text-gray-400 hover:text-cyber-promo" aria-label="Rechercher">
                <Search className="h-5 w-5" />
              </button>
            </div>
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recent searches</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 whitespace-nowrap">MacBook</span>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 whitespace-nowrap">Gaming laptop</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Popular categories</h4>
                  <ul className="space-y-2">
                    <li><Link href="/deals?category=Audio" className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Headphones</Link></li>
                    <li><Link href="/deals?category=Phones" className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Smartphones</Link></li>
                    <li><Link href="/deals?category=TV" className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Gaming TV</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/wishlist" className="text-cyber-main hover:text-cyber-promo transition-colors relative hidden sm:block p-2">
              <Heart className="h-6 w-6" />
              {isMounted && wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-cyber-promo text-cyber-main text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} className="text-cyber-main hover:text-cyber-promo transition-colors relative p-2" aria-label="Panier">
              <ShoppingCart className="h-6 w-6" />
              {isMounted && getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-cyber-promo text-cyber-main text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsUserMenuOpen(p => !p)}
                  className="flex items-center gap-2 text-cyber-main hover:text-cyber-promo transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-cyber-main text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </button>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-cyber-main text-sm truncate">{displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      {profile?.role === "admin" && (
                        <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard Admin
                        </Link>
                      )}
                      <Link href="/orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-cyber-main hover:bg-gray-50 transition-colors">
                        <UserIcon className="w-4 h-4" /> Mes commandes
                      </Link>
                      <form action={logoutAction}>
                        <button type="submit" className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" /> Se déconnecter
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-2 bg-cyber-main text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <UserIcon className="h-4 w-4" /> Connexion
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-cyber-white h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-xl tracking-tighter text-cyber-main">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="h-6 w-6 text-cyber-main" /></button>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className={`relative transition-all ${isSearchFocused ? "ring-2 ring-cyber-promo rounded-md" : ""}`}>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-cyber-light rounded-md py-3 pl-4 pr-10 text-sm outline-none"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              {isSearchFocused && (
                <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recent searches</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 whitespace-nowrap">MacBook</span>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 whitespace-nowrap">Gaming laptop</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Popular categories</h4>
                    <ul className="space-y-2">
                      <li><Link href="/deals?category=Audio" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Headphones</Link></li>
                      <li><Link href="/deals?category=Phones" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Smartphones</Link></li>
                      <li><Link href="/deals?category=TV" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-cyber-main hover:text-cyber-promo flex items-center gap-2"><Search className="w-3 h-3 text-gray-400" /> Gaming TV</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
              <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Shop All</Link>
              <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-cyber-promo">Today&apos;s Deals</Link>
              <hr className="border-gray-100 my-2" />
              <Link href="/deals" className="text-base text-cyber-text-sec">Computers & Tablets</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">Phones</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">Gaming</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">TV & Home Theater</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">Audio</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">Smart Home</Link>
              <Link href="/deals" className="text-base text-cyber-text-sec">Accessories</Link>
            </nav>
            <div className="p-4 border-t border-gray-100 bg-cyber-light space-y-2">
              {user ? (
                <>
                  <p className="text-sm font-bold text-cyber-main px-2">Bonjour, {displayName}</p>
                  <form action={logoutAction}>
                    <button type="submit" className="w-full flex items-center gap-2 text-red-600 font-medium px-2 py-2">
                      <LogOut className="w-4 h-4" /> Se déconnecter
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-cyber-main text-white font-bold py-2.5 rounded-lg">
                  Connexion / Inscription
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
