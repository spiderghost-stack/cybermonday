export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          slug: string
          brand: string
          description: string | null
          price: number
          old_price: number | null
          discount_percentage: number | null
          stock_quantity: number
          sku: string | null
          rating: number
          review_count: number
          badge: string | null
          is_featured: boolean
          is_trending: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          slug: string
          brand: string
          description?: string | null
          price: number
          old_price?: number | null
          discount_percentage?: number | null
          stock_quantity?: number
          sku?: string | null
          rating?: number
          review_count?: number
          badge?: string | null
          is_featured?: boolean
          is_trending?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          name?: string
          slug?: string
          brand?: string
          description?: string | null
          price?: number
          old_price?: number | null
          discount_percentage?: number | null
          stock_quantity?: number
          sku?: string | null
          badge?: string | null
          is_featured?: boolean
          is_trending?: boolean
          is_active?: boolean
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          is_primary?: boolean
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: never
      }
      carts: {
        Row: {
          id: string
          user_id: string
          status: 'active' | 'converted' | 'abandoned'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'active' | 'converted' | 'abandoned'
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'active' | 'converted' | 'abandoned'
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          quantity?: number
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string | null
          address_line_1: string
          address_line_2: string | null
          city: string
          state: string | null
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone?: string | null
          address_line_1: string
          address_line_2?: string | null
          city: string
          state?: string | null
          postal_code: string
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string
          phone?: string | null
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          state?: string | null
          postal_code?: string
          country?: string
          is_default?: boolean
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          discount_total: number
          shipping_total: number
          tax_total: number
          total: number
          currency: string
          shipping_address_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          order_number: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          discount_total?: number
          shipping_total?: number
          tax_total?: number
          total: number
          currency?: string
          shipping_address_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_sku: string | null
          unit_price: number
          quantity: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          product_sku?: string | null
          unit_price: number
          quantity: number
          subtotal: number
          created_at?: string
        }
        Update: never
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string | null
          content: string | null
          is_verified_purchase: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          title?: string | null
          content?: string | null
          is_verified_purchase?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          rating?: number
          title?: string | null
          content?: string | null
          is_approved?: boolean
          updated_at?: string
        }
      }
      promotions: {
        Row: {
          id: string
          name: string
          description: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          start_at: string
          end_at: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          start_at: string
          end_at: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          is_active?: boolean
          end_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience type aliases
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type WishlistItem = Database['public']['Tables']['wishlists']['Row']
export type Cart = Database['public']['Tables']['carts']['Row']
export type CartItem = Database['public']['Tables']['cart_items']['Row']
export type Address = Database['public']['Tables']['addresses']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Promotion = Database['public']['Tables']['promotions']['Row']

// Extended types for joined queries
export type ProductWithImages = Product & {
  product_images: ProductImage[]
  categories: Category | null
}

export type CartItemWithProduct = CartItem & {
  products: Product & { product_images: ProductImage[] }
}

export type OrderWithItems = Order & {
  order_items: OrderItem[]
  addresses: Address | null
}
