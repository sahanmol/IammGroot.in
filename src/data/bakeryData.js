export const BAKERY_INFO = {
  name: "IamGroot.in",
  tagline: "Artisanal Craft & Wood-Fired Perfection",
  description: "Slow-fermented sourdoughs, handcrafted French patisseries, and custom celebratory cakes baked fresh every morning with organic heritage flour.",
  phone: "+91 98765 43210",
  email: "hello@iamgroot.in",
  address: "42 Heritage Organic Lane, Jubilee Hills, Hyderabad, India",
  hours: {
    weekdays: "6:30 AM - 9:30 PM",
    weekends: "7:00 AM - 10:00 PM"
  },
  social: {
    instagram: "@iamgroot.in",
    facebook: "IamGrootBakery",
    twitter: "@IamGrootBakery"
  }
};

export const CATEGORIES = [
  { id: "all", label: "All Delights", icon: "Sparkles" },
  { id: "breads", label: "Artisan Breads", icon: "Wheat" },
  { id: "pastries", label: "Pastries & Tarts", icon: "Cookie" },
  { id: "cakes", label: "Signature Cakes", icon: "Cake" },
  { id: "beverages", label: "Coffee & Drinks", icon: "Coffee" },
  { id: "vegan-gf", label: "Vegan & GF", icon: "Leaf" },
];

export const MENU_ITEMS = [
  {
    id: "item-1",
    name: "Golden Sourdough Reserve",
    category: "breads",
    price: 280,
    rating: 4.9,
    reviewsCount: 124,
    image: "/images/sourdough.png",
    description: "Our signature 36-hour slow-fermented organic sourdough loaf with a blistered, caramelized crust and pillowy, open crumb structure.",
    ingredients: ["Organic Heritage Wheat", "Wild Yeast Culture", "Filtered Water", "Pink Himalayan Sea Salt"],
    calories: 220,
    prepTime: "Baked Fresh at 6:00 AM Daily",
    tags: ["Bestseller", "Organic", "Vegan"],
    isPopular: true
  },
  {
    id: "item-2",
    name: "Pain au Chocolat Supreme",
    category: "pastries",
    price: 220,
    rating: 4.95,
    reviewsCount: 210,
    image: "/images/croissant.png",
    description: "Flaky 81-layer French butter croissant dough encasing double batons of 70% Valrhona dark chocolate.",
    ingredients: ["French Normandy Butter", "70% Valrhona Dark Chocolate", "Pastry Flour", "Cane Sugar"],
    calories: 340,
    prepTime: "Freshly Baked Every 3 Hours",
    tags: ["Chef Special", "Bestseller"],
    isPopular: true
  },
  {
    id: "item-3",
    name: "Botanical Berry Celebration Cake",
    category: "cakes",
    price: 1850,
    rating: 5.0,
    reviewsCount: 88,
    image: "/images/cake.png",
    description: "Triple-layer vanilla bean sponge infused with elderflower syrup, filled with fresh wild raspberry compote and silky Swiss buttercream frosting.",
    ingredients: ["Madagascar Vanilla Bean", "Fresh Berries", "Elderflower Syrup", "Swiss Buttercream"],
    calories: 450,
    prepTime: "Requires 4 Hours Notice",
    tags: ["Signature", "Celebration"],
    isPopular: true
  },
  {
    id: "item-4",
    name: "Wild Strawberry Vanilla Tart",
    category: "pastries",
    price: 340,
    rating: 4.85,
    reviewsCount: 96,
    image: "/images/tart.png",
    description: "Crisp almond sable shell filled with Tahitian vanilla bean pastry cream, topped with sweet glazed farm strawberries.",
    ingredients: ["Almond Sable Crust", "Tahitian Vanilla Bean", "Fresh Strawberries", "Organic Custard"],
    calories: 290,
    prepTime: "Fresh Batch Ready",
    tags: ["Seasonal", "Gluten-Free Option Available"],
    isPopular: false
  },
  {
    id: "item-5",
    name: "Signature Groot Cappuccino",
    category: "beverages",
    price: 190,
    rating: 4.9,
    reviewsCount: 312,
    image: "/images/coffee.png",
    description: "Ethically sourced high-altitude single-origin Arabica espresso topped with velvety steamed milk latte art.",
    ingredients: ["100% Single-Origin Arabica", "Organic Full-Cream Milk / Oat Milk"],
    calories: 140,
    prepTime: "Prepared to Order (3 Mins)",
    tags: ["Barista Pick", "Vegan Milk Available"],
    isPopular: true
  },
  {
    id: "item-6",
    name: "Matcha Almond Cloud Muffin",
    category: "vegan-gf",
    price: 240,
    rating: 4.8,
    reviewsCount: 64,
    image: "/images/sourdough.png",
    description: "Gluten-free almond flour muffin enriched with ceremonial grade Uji matcha and toasted sliced almonds.",
    ingredients: ["Uji Matcha", "Organic Almond Flour", "Coconut Nectar", "Toasted Almonds"],
    calories: 210,
    prepTime: "Freshly Baked",
    tags: ["Gluten-Free", "Vegan"],
    isPopular: false
  },
  {
    id: "item-7",
    name: "Dark Chocolate Salted Caramel Tart",
    category: "pastries",
    price: 360,
    rating: 4.92,
    reviewsCount: 142,
    image: "/images/tart.png",
    description: "Rich dark chocolate ganache layer over house-made Fleur de Sel salted caramel in a crisp cocoa tart shell.",
    ingredients: ["Cocoa Tart Shell", "70% Dark Ganache", "Fleur de Sel Caramel"],
    calories: 380,
    prepTime: "Available Now",
    tags: ["Indulgent", "Chef Pick"],
    isPopular: true
  },
  {
    id: "item-8",
    name: "Iced Pistachio Rose Latte",
    category: "beverages",
    price: 230,
    rating: 4.88,
    reviewsCount: 178,
    image: "/images/coffee.png",
    description: "Espresso combined with house pistachios paste, organic rose water distillate, and chilled oat milk over crystal ice.",
    ingredients: ["Double Shot Espresso", "House Pistachio Cream", "Organic Rose Extract", "Oat Milk"],
    calories: 190,
    prepTime: "Prepared to Order",
    tags: ["Bestseller", "Refreshing"],
    isPopular: true
  }
];

export const CAKE_BUILDER_OPTIONS = {
  sizes: [
    { id: "6-inch", label: '6" Single Tier (Serves 6-8)', basePrice: 1200 },
    { id: "8-inch", label: '8" Double Tier (Serves 12-16)', basePrice: 2100 },
    { id: "10-inch", label: '10" Grand Triple Tier (Serves 22-28)', basePrice: 3500 },
  ],
  sponges: [
    { id: "vanilla", label: "Vanilla Bean Chiffon", price: 0 },
    { id: "chocolate", label: "Valrhona Dark Fudge", price: 150 },
    { id: "red-velvet", label: "Classic Red Velvet", price: 120 },
    { id: "pistachio", label: "Roasted Pistachio Cardamom", price: 250 },
  ],
  fillings: [
    { id: "swiss-buttercream", label: "Vanilla Swiss Buttercream", price: 0 },
    { id: "raspberry-compote", label: "Wild Raspberry & Rose Compote", price: 150 },
    { id: "salted-caramel", label: "Salted Butter Caramel & Roasted Pecans", price: 200 },
    { id: "passionfruit", label: "Tropical Passionfruit Mango Custard", price: 180 },
  ],
  decorations: [
    { id: "edible-flowers", label: "Fresh Edible Flowers & Gold Leaf", price: 300 },
    { id: "berry-crown", label: "Fresh Berry Crown", price: 350 },
    { id: "macarons", label: "Handcrafted Macarons Trio", price: 400 },
    { id: "minimalist", label: "Minimalist Textured Palette Knife Finish", price: 100 },
  ]
};

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Priya Sharma",
    role: "Food Critic & Regular",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 days ago",
    comment: "IamGroot.in has set the gold standard for artisanal baking in town. Their sourdough bread crust crackles like pure poetry, and the Pain au Chocolat melted in my mouth!"
  },
  {
    id: "rev-2",
    author: "Arjun Reddy",
    role: "Verified Order Customer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week ago",
    comment: "Ordered a custom 8-inch pistachio rose celebration cake for my sister's birthday. It was breathtakingly beautiful and tasted divine. The cake builder tool made ordering so smooth!"
  },
  {
    id: "rev-3",
    author: "Meera Nair",
    role: "Coffee & Pastry Lover",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 weeks ago",
    comment: "The atmosphere at IamGroot.in is magical and cozy. Pair their signature cappuccino with a fresh strawberry tart, and your morning is instantly made!"
  }
];
