import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products as mockProducts } from "@/data/products";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/supabase/queries/products";
import { Star, Truck, ShieldCheck, Check, ChevronRight } from "lucide-react";
import ProductActions from "./ProductActions";
import ProductCard from "@/components/ecommerce/ProductCard";

export async function generateStaticParams() {
  // Try Supabase first, fallback to mock slugs
  const dbSlugs = await getAllProductSlugs();
  const slugs = dbSlugs.length > 0 ? dbSlugs : mockProducts.map(p => p.slug);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
    ?? mockProducts.find(p => p.slug === params.slug);

  if (!product) return { title: "Product Not Found | Cyber Monday" };

  return {
    title: `${product.name} - Cyber Monday Deals`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Try Supabase first, fallback to mock data
  const product = await getProductBySlug(params.slug)
    ?? mockProducts.find(p => p.slug === params.slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product!.category, params.slug, 4)
    .then(res => res.length > 0 ? res : mockProducts.filter(p => p.category === product!.category && p.slug !== params.slug).slice(0, 4));

  const isDiscounted = product!.oldPrice && product!.oldPrice > product!.price;

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyber-promo">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/deals?category=${product.category}`} className="hover:text-cyber-promo">{product.category}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-cyber-promo text-cyber-main text-sm font-bold px-3 py-1 rounded-sm shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-cyber-promo transition-colors flex-shrink-0">
                    <Image src={img} alt="" fill className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              {product.brand}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-cyber-main tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-cyber-main">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-extrabold text-cyber-main">
                  ${product.price.toFixed(2)}
                </span>
                {isDiscounted && (
                  <span className="text-lg font-medium text-gray-400 line-through mb-1">
                    ${product.oldPrice?.toFixed(2)}
                  </span>
                )}
              </div>
              {isDiscounted && (
                <div className="inline-block bg-green-100 text-green-800 font-bold px-2 py-1 rounded text-sm mb-4">
                  Save ${(product.oldPrice! - product.price).toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-green-600 font-medium mb-8">
              <Check className="w-5 h-5" />
              In Stock ({product.stock} available)
            </div>

            {/* Client Component for Actions (Quantity, Add to Cart, Wishlist) */}
            <ProductActions product={product} />

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">1 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Details */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="text-2xl font-bold text-cyber-main mb-6">Product Information</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-600">
                    <span className="text-cyber-promo font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-cyber-main mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
