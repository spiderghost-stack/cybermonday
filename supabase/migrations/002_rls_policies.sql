-- ============================================================
-- MIGRATION 002 — Row Level Security (RLS)
-- ============================================================

-- ============================================================
-- PROFILES
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND role = (SELECT role FROM profiles WHERE user_id = auth.uid()) -- rôle immuable par l'utilisateur
  );

-- Admin : lire tous les profils
CREATE POLICY "profiles_admin_select_all" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- CATEGORIES
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_select" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "categories_admin_all" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- PRODUCTS
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_public_select" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "products_admin_all" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- PRODUCT_IMAGES
-- ============================================================
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "product_images_public_select" ON product_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE id = product_id AND is_active = true)
  );

CREATE POLICY "product_images_admin_all" ON product_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- WISHLISTS
-- ============================================================
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wishlists_own_select" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "wishlists_own_insert" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlists_own_delete" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- CARTS
-- ============================================================
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "carts_own_select" ON carts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "carts_own_insert" ON carts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "carts_own_update" ON carts
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- CART_ITEMS
-- ============================================================
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cart_items_own_all" ON cart_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM carts WHERE id = cart_id AND user_id = auth.uid())
  );

-- ============================================================
-- ADDRESSES
-- ============================================================
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "addresses_own_all" ON addresses
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- ORDERS
-- ============================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Client : uniquement ses propres commandes, lecture seule
CREATE POLICY "orders_own_select" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admin : toutes les commandes, et mise à jour du statut uniquement
CREATE POLICY "orders_admin_select" ON orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "orders_admin_update_status" ON orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- ORDER_ITEMS
-- ============================================================
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "order_items_own_select" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

CREATE POLICY "order_items_admin_select" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- REVIEWS
-- ============================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public : uniquement les avis approuvés
CREATE POLICY "reviews_public_select" ON reviews
  FOR SELECT USING (is_approved = true);

-- Utilisateur : écrire son propre avis
CREATE POLICY "reviews_own_insert" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    -- Le frontend ne peut PAS envoyer is_verified_purchase = true
  );

CREATE POLICY "reviews_own_update" ON reviews
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    -- Note: is_verified_purchase et is_approved ne peuvent être modifiés que par admin (RPC)
  );

-- Admin : tout
CREATE POLICY "reviews_admin_all" ON reviews
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- PROMOTIONS
-- ============================================================
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "promotions_public_select" ON promotions
  FOR SELECT USING (is_active = true AND start_at <= NOW() AND end_at >= NOW());

CREATE POLICY "promotions_admin_all" ON promotions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- PROMOTION_PRODUCTS
-- ============================================================
ALTER TABLE promotion_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "promotion_products_public_select" ON promotion_products
  FOR SELECT USING (true);

CREATE POLICY "promotion_products_admin_all" ON promotion_products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- NEWSLETTER_SUBSCRIBERS
-- ============================================================
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "newsletter_insert_anon" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true); -- Tout le monde peut s'inscrire

CREATE POLICY "newsletter_admin_all" ON newsletter_subscribers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );
