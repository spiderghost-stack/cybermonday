export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  images: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  badge?: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    brand: "Sony",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    ],
    price: 249.99,
    oldPrice: 399.99,
    discount: 37,
    rating: 4.8,
    reviewCount: 428,
    description: "Industry leading noise canceling with two processors control 8 microphones for unprecedented noise canceling.",
    features: ["Industry-leading noise canceling", "Up to 30-hour battery life", "Touch sensor controls"],
    badge: "-37%",
    stock: 120
  },
  {
    id: "prod-002",
    slug: "macbook-pro-m3",
    name: "Apple MacBook Pro 14\" M3 (2024)",
    brand: "Apple",
    category: "Computers",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
    ],
    price: 1399.00,
    oldPrice: 1599.00,
    discount: 12,
    rating: 4.9,
    reviewCount: 856,
    description: "The most advanced Mac ever. Powerful M3 chip for insane performance.",
    features: ["Apple M3 chip", "14-inch Liquid Retina XDR display", "18 hours battery life"],
    badge: "Best Seller",
    stock: 45
  },
  {
    id: "prod-003",
    slug: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    category: "Phones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"
    ],
    price: 999.99,
    oldPrice: 1299.99,
    discount: 23,
    rating: 4.7,
    reviewCount: 1205,
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.",
    features: ["Galaxy AI", "200MP Wide-angle Camera", "Titanium exterior"],
    badge: "Limited Deal",
    stock: 89
  },
  {
    id: "prod-004",
    slug: "lg-c3-oled",
    name: "LG C3 65\" 4K OLED Smart TV",
    brand: "LG",
    category: "TV & Home Theater",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"
    ],
    price: 1399.99,
    oldPrice: 1999.99,
    discount: 30,
    rating: 4.8,
    reviewCount: 312,
    description: "The LG OLED C3 features self-lit pixels that deliver infinite contrast, perfect black, and over a billion colors.",
    features: ["OLED Evo display", "α9 AI Processor Gen6", "webOS 23"],
    badge: "-30%",
    stock: 25
  },
  {
    id: "prod-005",
    slug: "ps5-slim",
    name: "PlayStation 5 Slim Console",
    brand: "Sony",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"
    ],
    price: 449.99,
    oldPrice: 499.99,
    discount: 10,
    rating: 4.9,
    reviewCount: 5430,
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.",
    features: ["Slim design", "Ultra-High Speed SSD", "Ray Tracing"],
    badge: "Trending",
    stock: 200
  },
  {
    id: "prod-006",
    slug: "canon-eos-r5",
    name: "Canon EOS R5 Mirrorless Camera",
    brand: "Canon",
    category: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
    ],
    price: 2999.00,
    oldPrice: 3899.00,
    discount: 23,
    rating: 4.7,
    reviewCount: 189,
    description: "The EOS R5 builds off of the powerful legacy of Canon's full frame cameras offering next generation refinements.",
    features: ["45 Megapixel Full-frame CMOS Sensor", "8K Video Recording", "In-Body Image Stabilization"],
    stock: 12
  },
  {
    id: "prod-007",
    slug: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1434493789847-2902a48ce056?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2902a48ce056?w=800&q=80"
    ],
    price: 749.00,
    oldPrice: 799.00,
    discount: 6,
    rating: 4.8,
    reviewCount: 654,
    description: "The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP.",
    features: ["S9 SiP", "Our brightest display ever", "Up to 36 hours of battery life"],
    stock: 150
  },
  {
    id: "prod-008",
    slug: "dji-mini-4-pro",
    name: "DJI Mini 4 Pro Drone",
    brand: "DJI",
    category: "Cameras",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80"
    ],
    price: 759.00,
    oldPrice: 959.00,
    discount: 21,
    rating: 4.9,
    reviewCount: 320,
    description: "Mini 4 Pro is our most advanced mini-camera drone to date. It integrates powerful imaging capabilities.",
    features: ["Under 249 g", "Omnidirectional Active Obstacle Sensing", "4K/60fps HDR True Vertical Shooting"],
    badge: "Sale",
    stock: 35
  },
  {
    id: "prod-009",
    slug: "nintendo-switch-oled",
    name: "Nintendo Switch OLED Model",
    brand: "Nintendo",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1578278235212-629ee358a999?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578278235212-629ee358a999?w=800&q=80"
    ],
    price: 299.99,
    oldPrice: 349.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 2100,
    description: "Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch system.",
    features: ["7-inch OLED screen", "64 GB internal storage", "Enhanced audio"],
    stock: 500
  },
  {
    id: "prod-010",
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80"
    ],
    price: 89.99,
    oldPrice: 99.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 950,
    description: "Meet MX Master 3S – an iconic mouse remastered for ultimate tactility, performance, and flow.",
    features: ["Any-surface tracking", "8K DPI sensor", "Quiet clicks"],
    stock: 80
  },
  {
    id: "prod-011",
    slug: "google-nest-hub",
    name: "Google Nest Hub (2nd Gen)",
    brand: "Google",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80"
    ],
    price: 49.99,
    oldPrice: 99.99,
    discount: 50,
    rating: 4.5,
    reviewCount: 156,
    description: "Meet the second-gen Nest Hub from Google, the center of your helpful home.",
    features: ["Control your smart home", "Play music and shows", "Sleep Sensing"],
    badge: "-50%",
    stock: 300
  },
  {
    id: "prod-012",
    slug: "bose-soundlink-flex",
    name: "Bose SoundLink Flex Portable Speaker",
    brand: "Bose",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"
    ],
    price: 119.00,
    oldPrice: 149.00,
    discount: 20,
    rating: 4.8,
    reviewCount: 780,
    description: "The SoundLink Flex Bluetooth speaker does more than just immerse you - it provides a strong connection to your music.",
    features: ["Waterproof & dustproof", "Up to 12 hours per charge", "PositionIQ technology"],
    stock: 110
  },
  {
    id: "prod-013",
    slug: "keychron-q1",
    name: "Keychron Q1 Pro Mechanical Keyboard",
    brand: "Keychron",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
    ],
    price: 179.00,
    oldPrice: 199.00,
    discount: 10,
    rating: 4.6,
    reviewCount: 230,
    description: "Meet the Keychron Q1 Pro, a groundbreaking full metal QMK/VIA wireless custom mechanical keyboard.",
    features: ["Full aluminum CNC body", "QMK/VIA support", "Hot-swappable"],
    stock: 40
  },
  {
    id: "prod-014",
    slug: "ipad-air-m2",
    name: "Apple iPad Air 11-inch (M2)",
    brand: "Apple",
    category: "Computers",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"
    ],
    price: 549.00,
    oldPrice: 599.00,
    discount: 8,
    rating: 4.9,
    reviewCount: 1150,
    description: "Supercharged by M2. iPad Air brings more power to your ideas.",
    features: ["M2 chip", "Liquid Retina display", "Landscape Ultra Wide front camera"],
    badge: "Trending",
    stock: 210
  },
  {
    id: "prod-015",
    slug: "philips-hue-starter",
    name: "Philips Hue White & Color Ambiance Starter Kit",
    brand: "Philips",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1550524514-c1511265b6f3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550524514-c1511265b6f3?w=800&q=80"
    ],
    price: 129.99,
    oldPrice: 199.99,
    discount: 35,
    rating: 4.7,
    reviewCount: 890,
    description: "Add ambient color to any room with the Philips Hue White and color ambiance starter kit.",
    features: ["16 million colors", "Control with voice", "Hue Bridge included"],
    badge: "-35%",
    stock: 95
  },
  {
    id: "prod-016",
    slug: "razer-blade-15",
    name: "Razer Blade 15 Gaming Laptop",
    brand: "Razer",
    category: "Computers",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80"
    ],
    price: 1999.00,
    oldPrice: 2499.00,
    discount: 20,
    rating: 4.5,
    reviewCount: 120,
    description: "More power. More cores. More frames. The new Razer Blade 15 is equipped with the latest Intel Core processors.",
    features: ["NVIDIA RTX 4070", "240Hz QHD display", "Advanced Vapor Chamber Cooling"],
    stock: 18
  },
  {
    id: "prod-017",
    slug: "gopro-hero12",
    name: "GoPro HERO12 Black",
    brand: "GoPro",
    category: "Cameras",
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80"
    ],
    price: 299.00,
    oldPrice: 399.00,
    discount: 25,
    rating: 4.6,
    reviewCount: 450,
    description: "Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life.",
    features: ["5.3K video", "HyperSmooth 6.0", "Waterproof up to 33ft"],
    badge: "Sale",
    stock: 130
  },
  {
    id: "prod-018",
    slug: "asus-rog-ally",
    name: "ASUS ROG Ally Gaming Handheld",
    brand: "ASUS",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1685368383823-149b552bb7eb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1685368383823-149b552bb7eb?w=800&q=80"
    ],
    price: 599.99,
    oldPrice: 699.99,
    discount: 14,
    rating: 4.4,
    reviewCount: 320,
    description: "Play all your favorite AAA and indie games on the incredible Full HD 120Hz display.",
    features: ["AMD Ryzen Z1 Extreme", "120Hz FHD Display", "Windows 11 Home"],
    stock: 60
  },
  {
    id: "prod-019",
    slug: "samsung-odyssey-g9",
    name: "Samsung Odyssey G9 49\" Curved Monitor",
    brand: "Samsung",
    category: "Computers",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
    ],
    price: 999.99,
    oldPrice: 1499.99,
    discount: 33,
    rating: 4.8,
    reviewCount: 410,
    description: "The 49-inch Odyssey G9 matches the curve of the human eye for maximum immersion and minimal eye strain.",
    features: ["1000R Curvature", "240Hz Refresh Rate", "QLED display"],
    badge: "-33%",
    stock: 25
  },
  {
    id: "prod-020",
    slug: "sonos-arc",
    name: "Sonos Arc Premium Smart Soundbar",
    brand: "Sonos",
    category: "TV & Home Theater",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    price: 719.00,
    oldPrice: 899.00,
    discount: 20,
    rating: 4.9,
    reviewCount: 1300,
    description: "Bring all your entertainment to life with the extraordinarily realistic sound of Arc, the premium smart soundbar for TV, movies, music, and more.",
    features: ["Dolby Atmos", "Voice control", "Apple AirPlay 2"],
    stock: 85
  }
];
