import { createClient as createStaticClient } from "@supabase/supabase-js";
import { type Product } from "@/data/products";

function getClient() {
  return createStaticClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

// ─── Mapper : convertit une ligne Supabase → type Product du frontend ─────
export function mapSupabaseProduct(row: any): Product {
  const primaryImage = row.product_images?.find((i: any) => i.is_primary)?.image_url
    ?? row.product_images?.[0]?.image_url
    ?? "/placeholder-product.jpg";

  const allImages = row.product_images?.map((i: any) => i.image_url) ?? [primaryImage];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.categories?.name ?? "Other",
    image: primaryImage,
    images: allImages,
    price: Number(row.price),
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    discount: row.discount_percentage ? Number(row.discount_percentage) : undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count ?? 0,
    description: row.description ?? "",
    features: [],
    badge: row.badge ?? undefined,
    stock: row.stock_quantity ?? 0,
  };
}

// ─── Helper pour exécuter une requête Supabase avec fallback silencieux ────
async function safeQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  label: string
): Promise<T | null> {
  try {
    const { data, error } = await queryFn();
    if (error) {
      // Silently warn (not error) — site keeps working via mock fallback
      console.warn(`[Supabase:${label}] ${error.message}`);
      return null;
    }
    return data;
  } catch (err: any) {
    console.warn(`[Supabase:${label}] Connection failed — using mock data fallback. (${err.message})`);
    return null;
  }
}

const PRODUCT_SELECT = `
  *,
  categories ( name, slug ),
  product_images ( image_url, is_primary, sort_order )
`;

// ─── Tous les produits actifs ─────────────────────────────────────────────
export async function getAllProducts(): Promise<Product[]> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).order("created_at", { ascending: false }),
    "getAllProducts"
  );
  return data ? (data as any[]).map(mapSupabaseProduct) : [];
}

// ─── Produits featured ────────────────────────────────────────────────────
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).eq("is_featured", true).order("discount_percentage", { ascending: false }).limit(limit),
    "getFeaturedProducts"
  );
  return data ? (data as any[]).map(mapSupabaseProduct) : [];
}

// ─── Produits trending ────────────────────────────────────────────────────
export async function getTrendingProducts(limit = 6): Promise<Product[]> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).eq("is_trending", true).order("rating", { ascending: false }).limit(limit),
    "getTrendingProducts"
  );
  return data ? (data as any[]).map(mapSupabaseProduct) : [];
}

// ─── Un seul produit par slug ─────────────────────────────────────────────
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).eq("is_active", true).single(),
    "getProductBySlug"
  );
  return data ? mapSupabaseProduct(data) : null;
}

// ─── Produits similaires ──────────────────────────────────────────────────
export async function getRelatedProducts(
  categoryName: string,
  currentSlug: string,
  limit = 4
): Promise<Product[]> {
  const supabase = getClient();

  const catData = await safeQuery(
    async () => await supabase.from("categories").select("id").eq("name", categoryName).single(),
    "getRelatedProducts/category"
  );
  if (!catData) return [];

  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).eq("category_id", (catData as any).id).neq("slug", currentSlug).limit(limit),
    "getRelatedProducts/products"
  );
  return data ? (data as any[]).map(mapSupabaseProduct) : [];
}

// ─── Tous les slugs pour generateStaticParams ─────────────────────────────
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select("slug").eq("is_active", true),
    "getAllProductSlugs"
  );
  return data ? (data as any[]).map((p) => p.slug) : [];
}

// ─── Produits par catégorie ───────────────────────────────────────────────
export async function getProductsByCategory(
  categorySlug: string,
  limit = 20
): Promise<Product[]> {
  const supabase = getClient();
  const data = await safeQuery(
    async () => await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true).eq("categories.slug", categorySlug).order("discount_percentage", { ascending: false }).limit(limit),
    "getProductsByCategory"
  );
  return data ? (data as any[]).map(mapSupabaseProduct) : [];
}
