import { Suspense } from "react";
import DealsContent from "./DealsContent";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { getAllProducts } from "@/lib/supabase/queries/products";
import { products as mockProducts } from "@/data/products";

export default async function DealsPage() {
  // Fetch from Supabase, fallback to mock data if empty
  const dbProducts = await getAllProducts();
  const allProducts = dbProducts.length > 0 ? dbProducts : mockProducts;

  return (
    <Suspense fallback={<DealsLoadingSkeleton />}>
      <DealsContent initialProducts={allProducts} />
    </Suspense>
  );
}

function DealsLoadingSkeleton() {
  return (
    <div className="bg-cyber-light min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 h-96 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {[1,2,3,4,5,6].map(i => <ProductSkeleton key={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
