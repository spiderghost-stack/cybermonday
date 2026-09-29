-- ============================================================
-- MIGRATION 001 — Schema complet Cyber Monday E-commerce
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- FONCTION utilitaire : mise à jour automatique de updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABLE: profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name  TEXT,
  last_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Création automatique du profil à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id         UUID REFERENCES categories(id) ON DELETE SET NULL,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  brand               TEXT NOT NULL,
  description         TEXT,
  price               NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  old_price           NUMERIC(10,2) CHECK (old_price >= 0),
  discount_percentage NUMERIC(5,2) CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  stock_quantity      INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  sku                 TEXT UNIQUE,
  rating              NUMERIC(3,2) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count        INTEGER NOT NULL DEFAULT 0,
  badge               TEXT,
  is_featured         BOOLEAN NOT NULL DEFAULT false,
  is_trending         BOOLEAN NOT NULL DEFAULT false,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_trending ON products(is_trending) WHERE is_trending = true;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: product_images
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  alt_text    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================
-- TABLE: wishlists
-- ============================================================
CREATE TABLE IF NOT EXISTS wishlists (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_wishlists_user ON wishlists(user_id);

-- ============================================================
-- TABLE: carts
-- ============================================================
CREATE TABLE IF NOT EXISTS carts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'converted', 'abandoned')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, status) -- uniquement un panier actif par user
);

CREATE TRIGGER trg_carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: cart_items
-- ============================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id     UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(cart_id, product_id)
);

CREATE TRIGGER trg_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: addresses
-- ============================================================
CREATE TABLE IF NOT EXISTS addresses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  phone           TEXT,
  address_line_1  TEXT NOT NULL,
  address_line_2  TEXT,
  city            TEXT NOT NULL,
  state           TEXT,
  postal_code     TEXT NOT NULL,
  country         TEXT NOT NULL DEFAULT 'FR',
  is_default      BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  order_number          TEXT NOT NULL UNIQUE,
  status                TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal              NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  discount_total        NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (discount_total >= 0),
  shipping_total        NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (shipping_total >= 0),
  tax_total             NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (tax_total >= 0),
  total                 NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  currency              TEXT NOT NULL DEFAULT 'USD',
  shipping_address_id   UUID REFERENCES addresses(id) ON DELETE SET NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: order_items
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL, -- snapshoted at order time
  product_sku   TEXT,
  unit_price    NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  subtotal      NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- TABLE: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id            UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating                INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title                 TEXT,
  content               TEXT,
  is_verified_purchase  BOOLEAN NOT NULL DEFAULT false,
  is_approved           BOOLEAN NOT NULL DEFAULT false,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: promotions
-- ============================================================
CREATE TABLE IF NOT EXISTS promotions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  description     TEXT,
  discount_type   TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value  NUMERIC(10,2) NOT NULL CHECK (discount_value > 0),
  start_at        TIMESTAMPTZ NOT NULL,
  end_at          TIMESTAMPTZ NOT NULL,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_promotions_updated_at
  BEFORE UPDATE ON promotions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: promotion_products
-- ============================================================
CREATE TABLE IF NOT EXISTS promotion_products (
  promotion_id  UUID NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (promotion_id, product_id)
);

-- ============================================================
-- TABLE: newsletter_subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL UNIQUE,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- FONCTION: create_order_transaction
-- Crée une commande de manière atomique (panier → commande → stock)
-- ============================================================
CREATE OR REPLACE FUNCTION create_order_transaction(p_cart_id UUID, p_user_id UUID, p_shipping_address_id UUID DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
  v_cart        RECORD;
  v_item        RECORD;
  v_product     RECORD;
  v_order_id    UUID;
  v_order_number TEXT;
  v_subtotal    NUMERIC := 0;
  v_total       NUMERIC := 0;
BEGIN
  -- 1. Vérifier que le panier appartient bien à l'utilisateur
  SELECT * INTO v_cart FROM carts
  WHERE id = p_cart_id AND user_id = p_user_id AND status = 'active';

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'code', 'INVALID_CART', 'message', 'Cart not found or already processed.');
  END IF;

  -- 2. Vérifier chaque item du panier
  FOR v_item IN SELECT ci.*, ci.quantity FROM cart_items ci WHERE ci.cart_id = p_cart_id LOOP

    SELECT * INTO v_product FROM products WHERE id = v_item.product_id AND is_active = true;

    IF NOT FOUND THEN
      RETURN json_build_object('success', false, 'code', 'PRODUCT_NOT_FOUND', 'message', 'One or more products no longer exist.');
    END IF;

    IF v_product.stock_quantity < v_item.quantity THEN
      RETURN json_build_object('success', false, 'code', 'INSUFFICIENT_STOCK', 'message', 'One or more products are no longer available in the requested quantity.');
    END IF;

    v_subtotal := v_subtotal + (v_product.price * v_item.quantity);
  END LOOP;

  v_total := v_subtotal; -- Shipping free, no tax for MVP

  -- 3. Générer un numéro de commande unique
  v_order_number := 'CM-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 6));

  -- 4. Créer la commande
  INSERT INTO orders (user_id, order_number, status, subtotal, total, shipping_address_id)
  VALUES (p_user_id, v_order_number, 'pending', v_subtotal, v_total, p_shipping_address_id)
  RETURNING id INTO v_order_id;

  -- 5. Créer les order_items + décrémenter le stock
  FOR v_item IN SELECT ci.*, ci.quantity FROM cart_items ci WHERE ci.cart_id = p_cart_id LOOP

    SELECT * INTO v_product FROM products WHERE id = v_item.product_id;

    INSERT INTO order_items (order_id, product_id, product_name, product_sku, unit_price, quantity, subtotal)
    VALUES (v_order_id, v_product.id, v_product.name, v_product.sku, v_product.price, v_item.quantity, v_product.price * v_item.quantity);

    UPDATE products SET stock_quantity = stock_quantity - v_item.quantity WHERE id = v_product.id;
  END LOOP;

  -- 6. Fermer le panier
  UPDATE carts SET status = 'converted' WHERE id = p_cart_id;

  RETURN json_build_object('success', true, 'order_id', v_order_id, 'order_number', v_order_number, 'total', v_total);

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'code', 'ORDER_CREATION_FAILED', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
