"use client";

import { useState, useMemo } from "react";
import { type Product } from "@/data/products";
import ProductCard from "@/components/ecommerce/ProductCard";
import { Filter, X, ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

export default function DealsContent({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "";

  // Use the products passed from the server (real or mock)
  const products = initialProducts;

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter(p =>
        selectedPriceRanges.some(range => {
          if (range === "under-25") return p.price < 25;
          if (range === "25-50") return p.price >= 25 && p.price < 50;
          if (range === "50-100") return p.price >= 50 && p.price < 100;
          if (range === "100-250") return p.price >= 100 && p.price < 250;
          if (range === "over-250") return p.price >= 250;
          return false;
        })
      );
    }

    if (selectedRating !== null) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case "price-asc":   result.sort((a, b) => a.price - b.price); break;
      case "price-desc":  result.sort((a, b) => b.price - a.price); break;
      case "rating":      result.sort((a, b) => b.rating - a.rating); break;
      case "discount":    result.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
    }

    return result;
  }, [selectedCategories, selectedPriceRanges, selectedRating, sortBy, products]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );

  const togglePriceRange = (range: string) =>
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRating(null);
    router.replace("/deals", { scroll: false });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedPriceRanges.length > 0 || selectedRating !== null;
  const allCategories = Array.from(new Set(products.map(p => p.category))).sort();

  const renderFilterPanel = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg text-cyber-main">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-cyber-promo font-medium hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold text-cyber-main mb-3">Category</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {allCategories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded accent-cyber-promo cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-cyber-main transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-cyber-main mb-3">Price</h3>
        <div className="space-y-2">
          {[
            { id: "under-25",  label: "Under $25" },
            { id: "25-50",     label: "$25 – $50" },
            { id: "50-100",    label: "$50 – $100" },
            { id: "100-250",   label: "$100 – $250" },
            { id: "over-250",  label: "$250 & Above" },
          ].map(r => (
            <label key={r.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(r.id)}
                onChange={() => togglePriceRange(r.id)}
                className="w-4 h-4 rounded accent-cyber-promo cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-cyber-main transition-colors">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-cyber-main mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="w-4 h-4 accent-cyber-promo cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-cyber-main transition-colors">{rating} Stars & Up</span>
            </label>
          ))}
          {selectedRating !== null && (
            <button onClick={() => setSelectedRating(null)} className="text-xs text-gray-400 hover:text-red-500 mt-1">
              Clear rating
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-cyber-light min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-cyber-main tracking-tight">Cyber Monday Deals</h1>
            <p className="text-gray-500 mt-1 text-sm">{filteredProducts.length} products found</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsFilterMenuOpen(true)}
              className="lg:hidden flex-1 bg-white border border-gray-200 text-cyber-main font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" /> Filters
              {hasActiveFilters && (
                <span className="bg-cyber-promo text-cyber-main text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedCategories.length + selectedPriceRanges.length + (selectedRating ? 1 : 0)}
                </span>
              )}
            </button>
            <div className="relative flex-1 md:w-52">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full appearance-none bg-white border border-gray-200 text-cyber-main font-bold py-2 pl-4 pr-10 rounded-lg outline-none focus:border-cyber-promo cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {renderFilterPanel()}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center flex flex-col items-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <Filter className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-cyber-main mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try changing your filters or search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="bg-cyber-main text-white font-bold py-2.5 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterMenuOpen(false)} />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full shadow-2xl ml-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-cyber-main">Filters</h2>
              <button onClick={() => setIsFilterMenuOpen(false)} className="p-2 text-gray-400 hover:text-cyber-main">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {renderFilterPanel()}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button onClick={clearFilters} className="flex-1 py-3 border border-gray-200 text-cyber-main font-bold rounded-lg bg-white">
                Clear
              </button>
              <button onClick={() => setIsFilterMenuOpen(false)} className="flex-1 py-3 bg-cyber-promo text-cyber-main font-bold rounded-lg">
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
