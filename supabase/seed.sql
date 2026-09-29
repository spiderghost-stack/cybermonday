-- ============================================================
-- SEED — Données initiales Cyber Monday
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
  ('Computers',        'computers',        'Laptops, desktops & accessories',    1, true),
  ('Phones',           'phones',           'Smartphones & accessories',           2, true),
  ('Gaming',           'gaming',           'Consoles, games & accessories',       3, true),
  ('TV & Home Theater','tv-home-theater',  'TVs, soundbars & streaming',          4, true),
  ('Audio',            'audio',            'Headphones & speakers',               5, true),
  ('Cameras',          'cameras',          'Cameras & accessories',               6, true),
  ('Smart Home',       'smart-home',       'Smart devices & security',            7, true),
  ('Accessories',      'accessories',      'Chargers, cables & peripherals',      8, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PRODUCTS
-- ============================================================
INSERT INTO products (
  category_id, name, slug, brand, description,
  price, old_price, discount_percentage,
  stock_quantity, sku, rating, review_count,
  badge, is_featured, is_trending, is_active
)
SELECT
  c.id,
  p.name, p.slug, p.brand, p.description,
  p.price, p.old_price, p.discount_percentage,
  p.stock_quantity, p.sku, p.rating, p.review_count,
  p.badge, p.is_featured, p.is_trending, true
FROM (VALUES
  ('audio',         'Sony WH-1000XM5 Wireless Noise Canceling Headphones', 'sony-wh-1000xm5',         'Sony',      'Industry leading noise canceling with two processors control 8 microphones.',                   249.99, 399.99, 37.50, 120, 'SKU-001', 4.8, 428,  '-37%',       true,  true),
  ('computers',     'Apple MacBook Pro 14" M3 (2024)',                      'macbook-pro-m3',           'Apple',     'The most advanced Mac ever. Powerful M3 chip for insane performance.',                         1399.00, 1599.00, 12.50, 45, 'SKU-002', 4.9, 856,  'Best Seller', true,  true),
  ('phones',        'Samsung Galaxy S24 Ultra 256GB',                       'samsung-s24-ultra',        'Samsung',   'Welcome to the era of mobile AI with Galaxy S24 Ultra.',                                       999.99, 1299.99, 23.08, 89, 'SKU-003', 4.7, 1205, 'Limited Deal',true,  false),
  ('tv-home-theater','LG C3 65" 4K OLED Smart TV',                         'lg-c3-oled-65',            'LG',        'Self-lit pixels that deliver infinite contrast and perfect black.',                            1399.99, 1999.99, 30.00, 25, 'SKU-004', 4.8, 312,  '-30%',       true,  false),
  ('gaming',        'PlayStation 5 Slim Console',                           'ps5-slim',                 'Sony',      'Experience lightning-fast loading with an ultra-high speed SSD.',                             449.99, 499.99, 10.00, 200,'SKU-005', 4.9, 5430, 'Trending',    true,  true),
  ('cameras',       'Canon EOS R5 Mirrorless Camera Body',                  'canon-eos-r5',             'Canon',     'Full-frame mirrorless with 45MP sensor and 8K video recording.',                              2999.00, 3899.00, 23.08, 12,'SKU-006', 4.7, 189,  NULL,          false, false),
  ('accessories',   'Apple Watch Ultra 2',                                  'apple-watch-ultra-2',      'Apple',     'The most rugged and capable Apple Watch pushes the limits again.',                            749.00, 799.00, 6.26,  150,'SKU-007', 4.8, 654,  NULL,          false, true),
  ('cameras',       'DJI Mini 4 Pro Drone',                                 'dji-mini-4-pro',           'DJI',       'Under 249g with omnidirectional obstacle sensing and 4K/60fps video.',                        759.00, 959.00, 20.85, 35, 'SKU-008', 4.9, 320,  'Sale',        false, false),
  ('gaming',        'Nintendo Switch OLED Model',                           'nintendo-switch-oled',     'Nintendo',  'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.',                     299.99, 349.99, 14.29, 500,'SKU-009', 4.8, 2100, NULL,          false, false),
  ('accessories',   'Logitech MX Master 3S Wireless Mouse',                 'logitech-mx-master-3s',    'Logitech',  'Meet MX Master 3S – an iconic mouse remastered for ultimate tactility.',                      89.99, 99.99, 10.00,  80, 'SKU-010', 4.7, 950,  NULL,          false, false),
  ('smart-home',    'Google Nest Hub (2nd Gen)',                             'google-nest-hub-2',        'Google',    'Meet the second-gen Nest Hub — the center of your helpful home.',                              49.99, 99.99, 50.00,  300,'SKU-011', 4.5, 156,  '-50%',        true,  false),
  ('audio',         'Bose SoundLink Flex Portable Speaker',                 'bose-soundlink-flex',      'Bose',      'Waterproof Bluetooth speaker with PositionIQ technology.',                                    119.00, 149.00, 20.13, 110,'SKU-012', 4.8, 780,  NULL,          false, false),
  ('accessories',   'Keychron Q1 Pro Mechanical Keyboard',                  'keychron-q1-pro',          'Keychron',  'Full aluminum CNC body QMK/VIA wireless custom mechanical keyboard.',                         179.00, 199.00, 10.05, 40, 'SKU-013', 4.6, 230,  NULL,          false, false),
  ('computers',     'Apple iPad Air 11-inch (M2)',                          'ipad-air-m2',              'Apple',     'Supercharged by M2. iPad Air brings more power to your ideas.',                               549.00, 599.00, 8.35, 210, 'SKU-014', 4.9, 1150, 'Trending',    true,  true),
  ('smart-home',    'Philips Hue White & Color Starter Kit',                'philips-hue-starter-kit',  'Philips',   'Add ambient color to any room with 16 million colors.',                                       129.99, 199.99, 35.00, 95, 'SKU-015', 4.7, 890,  '-35%',        false, false),
  ('computers',     'Razer Blade 15 Gaming Laptop',                         'razer-blade-15',           'Razer',     'NVIDIA RTX 4070 with 240Hz QHD display for ultimate gaming performance.',                    1999.00, 2499.00, 20.01, 18,'SKU-016', 4.5, 120,  NULL,          true,  false),
  ('cameras',       'GoPro HERO12 Black',                                   'gopro-hero12-black',       'GoPro',     '5.3K video with HyperSmooth 6.0 stabilization and up to 33ft waterproof.',                   299.00, 399.00, 25.06, 130,'SKU-017', 4.6, 450,  'Sale',        false, false),
  ('gaming',        'ASUS ROG Ally Gaming Handheld',                        'asus-rog-ally',            'ASUS',      'AMD Ryzen Z1 Extreme with 120Hz FHD display running Windows 11.',                             599.99, 699.99, 14.29, 60, 'SKU-018', 4.4, 320,  NULL,          false, false),
  ('computers',     'Samsung Odyssey G9 49" Curved Monitor',                'samsung-odyssey-g9',       'Samsung',   '1000R curvature QLED display with 240Hz refresh rate.',                                       999.99, 1499.99, 33.33, 25,'SKU-019', 4.8, 410,  '-33%',        true,  false),
  ('tv-home-theater','Sonos Arc Premium Smart Soundbar',                    'sonos-arc-soundbar',       'Sonos',     'Dolby Atmos soundbar with Apple AirPlay 2 and voice control.',                                719.00, 899.00, 20.02, 85, 'SKU-020', 4.9, 1300, NULL,          true,  true)
) AS p(category_slug, name, slug, brand, description, price, old_price, discount_percentage, stock_quantity, sku, rating, review_count, badge, is_featured, is_trending)
JOIN categories c ON c.slug = p.category_slug
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PRODUCT_IMAGES
-- ============================================================
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, img.image_url, p.name, img.sort_order, img.is_primary
FROM products p
JOIN (VALUES
  ('sony-wh-1000xm5',       'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', true,  0),
  ('sony-wh-1000xm5',       'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',    false, 1),
  ('macbook-pro-m3',         'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', true,  0),
  ('samsung-s24-ultra',      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', true,  0),
  ('lg-c3-oled-65',          'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', true,  0),
  ('ps5-slim',               'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80', true,  0),
  ('canon-eos-r5',           'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', true,  0),
  ('apple-watch-ultra-2',    'https://images.unsplash.com/photo-1434493789847-2902a48ce056?w=800&q=80', true,  0),
  ('dji-mini-4-pro',         'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80', true,  0),
  ('nintendo-switch-oled',   'https://images.unsplash.com/photo-1578278235212-629ee358a999?w=800&q=80', true,  0),
  ('logitech-mx-master-3s',  'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80', true,  0),
  ('google-nest-hub-2',      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80',    true,  0),
  ('bose-soundlink-flex',    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', true,  0),
  ('keychron-q1-pro',        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', true,  0),
  ('ipad-air-m2',            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',    true,  0),
  ('philips-hue-starter-kit','https://images.unsplash.com/photo-1550524514-c1511265b6f3?w=800&q=80',    true,  0),
  ('razer-blade-15',         'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80', true,  0),
  ('gopro-hero12-black',     'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80', true,  0),
  ('asus-rog-ally',          'https://images.unsplash.com/photo-1685368383823-149b552bb7eb?w=800&q=80', true,  0),
  ('samsung-odyssey-g9',     'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80', true,  0),
  ('sonos-arc-soundbar',     'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',    true,  0)
) AS img(product_slug, image_url, is_primary, sort_order)
ON (p.slug = img.product_slug)
ON CONFLICT DO NOTHING;

-- ============================================================
-- PROMOTION CYBER MONDAY 2026
-- ============================================================
INSERT INTO promotions (name, description, discount_type, discount_value, start_at, end_at, is_active)
VALUES (
  'Cyber Monday 2026',
  'Les meilleures offres tech de la saison. Réductions exceptionnelles sur une sélection de produits.',
  'percentage',
  20.00,
  '2026-11-30T00:00:00Z',
  '2026-11-30T23:59:59Z',
  true
)
ON CONFLICT DO NOTHING;
