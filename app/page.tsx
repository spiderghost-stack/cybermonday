import Image from "next/image";
import Link from "next/link";
import { products as mockProducts } from "@/data/products";
import { getFeaturedProducts, getTrendingProducts } from "@/lib/supabase/queries/products";
import ProductCard from "@/components/ecommerce/ProductCard";
import Countdown from "@/components/ecommerce/Countdown";
import Newsletter from "@/components/ecommerce/Newsletter";
import { Laptop, Smartphone, Gamepad2, Tv, Headphones, Camera, Home, Cable, Truck, ShieldCheck, Undo2, Star } from "lucide-react";

export default async function HomePage() {
  // Fetch real data from Supabase, fallback to mock data if DB is empty
  const [featuredFromDB, trendingFromDB] = await Promise.all([
    getFeaturedProducts(4),
    getTrendingProducts(4),
  ]);

  const topDeals = featuredFromDB.length > 0
    ? featuredFromDB
    : mockProducts.filter(p => p.discount && p.discount >= 20).slice(0, 4);

  const trending = trendingFromDB.length > 0
    ? trendingFromDB
    : mockProducts.filter(p => p.badge === "Trending" || p.rating >= 4.8).slice(0, 4);

  const categories = [
    { name: "Computers", icon: Laptop, href: "/deals?category=Computers", desc: "Laptops & desktops" },
    { name: "Phones", icon: Smartphone, href: "/deals?category=Phones", desc: "Smartphones & acc" },
    { name: "Gaming", icon: Gamepad2, href: "/deals?category=Gaming", desc: "Consoles & games" },
    { name: "TV & Home Theater", icon: Tv, href: "/deals?category=TV", desc: "TVs & soundbars" },
    { name: "Audio", icon: Headphones, href: "/deals?category=Audio", desc: "Headphones & speakers" },
    { name: "Cameras", icon: Camera, href: "/deals?category=Cameras", desc: "Cameras & lenses" },
    { name: "Smart Home", icon: Home, href: "/deals?category=SmartHome", desc: "Smart devices" },
    { name: "Accessories", icon: Cable, href: "/deals?category=Accessories", desc: "Chargers & cables" },
  ];

  return (
    <div className="flex flex-col pb-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-cyber-main text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80" 
            alt="Cyber Monday Tech"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-main via-cyber-main/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start space-y-6">
              <div className="inline-block bg-cyber-promo text-cyber-main font-bold px-3 py-1 rounded-sm text-sm uppercase tracking-wider mb-2">
                Epic Holiday Event
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                CYBER MONDAY<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-promo to-cyber-accent">
                  LOW PRICES. BIG TECH.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                Les meilleures offres tech de la saison. Des réductions exceptionnelles sur vos produits préférés, jusqu'à épuisement des stocks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link href="/deals" className="bg-cyber-promo hover:bg-cyber-promo/90 text-cyber-main text-center font-bold py-4 px-8 rounded-lg transition-transform hover:scale-105">
                  SHOP THE DEALS
                </Link>
                <Link href="#categories" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-center font-bold py-4 px-8 rounded-lg transition-colors border border-white/20">
                  EXPLORE CATEGORIES
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES */}
      <section id="categories" className="py-16 bg-cyber-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-cyber-main tracking-tight mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link key={idx} href={cat.href} className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-cyber-promo transition-all flex flex-col items-center text-center">
                  <div className="bg-gray-50 group-hover:bg-cyber-promo/10 p-4 rounded-full mb-4 transition-colors">
                    <Icon className="w-8 h-8 text-cyber-main group-hover:text-cyber-promo transition-colors" />
                  </div>
                  <h3 className="font-bold text-cyber-main mb-1 group-hover:text-cyber-promo">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TODAY's TOP DEALS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-cyber-main tracking-tight">Today's Top Deals</h2>
              <p className="text-gray-500 mt-2">Don't miss these limited-time offers.</p>
            </div>
            <Link href="/deals" className="hidden sm:block text-cyber-main font-bold hover:text-cyber-promo hover:underline">
              View all deals &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <Link href="/deals" className="block sm:hidden text-center w-full mt-8 bg-cyber-light py-3 rounded-lg font-bold text-cyber-main">
            View all deals
          </Link>
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-cyber-main">
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80" 
                alt="Setup Upgrade"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-main to-transparent"></div>
            </div>
            <div className="relative z-10 p-8 md:p-16 flex flex-col items-start max-w-xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">UPGRADE YOUR SETUP</h2>
              <p className="text-gray-300 text-lg mb-8">Save big on laptops, monitors, keyboards and gaming accessories. Build your dream workspace today.</p>
              <Link href="/deals" className="bg-white text-cyber-main font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                SHOP COMPUTERS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRENDING NOW */}
      <section className="py-16 bg-cyber-light border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-cyber-main tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-2">What shoppers are looking at right now.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY SHOP WITH US */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-cyber-light p-4 rounded-full text-cyber-main">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-cyber-main">Fast Shipping</h3>
              <p className="text-sm text-gray-500">Get your order quickly.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-cyber-light p-4 rounded-full text-cyber-main">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-cyber-main">Secure Checkout</h3>
              <p className="text-sm text-gray-500">Your information is protected.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-cyber-light p-4 rounded-full text-cyber-main">
                <Undo2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-cyber-main">Easy Returns</h3>
              <p className="text-sm text-gray-500">Shop with confidence.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-cyber-light p-4 rounded-full text-cyber-main">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-cyber-main">Customer Reviews</h3>
              <p className="text-sm text-gray-500">Thousands of verified ratings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <Newsletter />
      
    </div>
  );
}
