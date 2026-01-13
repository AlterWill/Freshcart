// Using Unsplash source URLs for consistent, high-quality images without hotlinking specific random IDs.

export const FEATURES = [
  { title: 'Free Shipping', desc: 'On all orders over $50', icon: '🚚' },
  { title: 'Freshness', desc: '100% Fresh Guaranteed', icon: '🥬' },
  { title: 'Support', desc: '24/7 Dedicated Support', icon: '🎧' },
  { title: 'Secure', desc: '100% Secure Payment', icon: '🛡️' },
];

export const CATEGORIES = [
  { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80' },
  { name: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Fish', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' },
  { name: 'Drinks', image: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?auto=format&fit=crop&w=300&q=80' },
];

export const PRODUCTS = [
  {
    id: 1,
    title: "Organic Fresh Spinach",
    category: "Vegetables",
    price: 4.99,
    oldPrice: 6.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sku: "VEG-SPIN-001",
    description: "Farm-fresh organic spinach leaves, perfect for salads and smoothies.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Whole Grain Sourdough Bread",
    category: "Bakery",
    price: 5.50,
    oldPrice: null,
    rating: 4.9,
    reviews: 89,
    inStock: true,
    sku: "BAK-SOUR-002",
    description: "Artisanal sourdough bread baked fresh daily with whole grains.",
    image: "https://images.unsplash.com/photo-1585476644321-b976214b2e22?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Premium Bananas (Bunch)",
    category: "Fruits",
    price: 2.99,
    oldPrice: 3.50,
    rating: 4.5,
    reviews: 210,
    inStock: true,
    sku: "FRU-BAN-003",
    description: "Sweet and creamy bananas, rich in potassium.",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86279?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Fresh Salmon Fillet",
    category: "Fish",
    price: 15.99,
    oldPrice: 18.99,
    rating: 4.7,
    reviews: 56,
    inStock: true,
    sku: "SEA-SAL-004",
    description: "Wild-caught salmon fillet, rich in Omega-3 fatty acids.",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Red Apples (1kg)",
    category: "Fruits",
    price: 3.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 145,
    inStock: true,
    sku: "FRU-APP-005",
    description: "Crisp and juicy red apples, directly from the orchard.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Avocado (Each)",
    category: "Vegetables",
    price: 1.50,
    oldPrice: 2.00,
    rating: 4.9,
    reviews: 320,
    inStock: true,
    sku: "VEG-AVO-006",
    description: "Creamy ripe avocados, perfect for guacamole or toast.",
    image: "https://images.unsplash.com/photo-1523049673856-42848f51a55f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "Fresh Orange Juice",
    category: "Drinks",
    price: 4.50,
    oldPrice: 5.00,
    rating: 4.8,
    reviews: 98,
    inStock: true,
    sku: "DRK-ORG-007",
    description: "100% pure squeezed orange juice, no sugar added.",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Angus Beef Steak",
    category: "Meat",
    price: 22.99,
    oldPrice: 28.99,
    rating: 4.9,
    reviews: 78,
    inStock: true,
    sku: "MET-STK-008",
    description: "Premium Angus beef steak, perfect for grilling.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80"
  }
];

export const CART_ITEMS = [
  {
    id: 1,
    title: "Organic Fresh Spinach",
    price: 4.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80",
    unit: "Bundle"
  },
  {
    id: 2,
    title: "Whole Grain Sourdough",
    price: 5.50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1585476644321-b976214b2e22?auto=format&fit=crop&w=150&q=80",
    unit: "Loaf"
  }
];

export const STATS = [
  { label: 'Happy Customers', value: '500k+' },
  { label: 'Active Sellers', value: '2,500+' },
  { label: 'Products', value: '10k+' },
  { label: 'Years of Service', value: '10+' },
];

export const TEAM_MEMBERS = [
    { id: 1, name: "Rishon K Roshan", role: "CEO & Founder" },
    { id: 2, name: "Rasya", role: "Head of Engineering" },
    { id: 3, name: "Joel Dcunha", role: "Product Designer" },
    { id: 4, name: "John Paul Paret", role: "Marketing Lead" },
];

export const BLOG_POSTS = [
  {
      id: 1,
      title: "Garlic Cream Bucatini with Peas and Asparagus",
      category: "Recipes",
      date: "25 April 2026",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80" 
  },
  {
      id: 2,
      title: "Simple, Healthy & Delicious Green Smoothies",
      category: "Health",
      date: "22 April 2026",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80" 
  },
  {
      id: 3,
      title: "The Ultimate Guide to Meal Prep for Beginners",
      category: "Tips",
      date: "20 April 2026",
      image: "https://images.unsplash.com/photo-1511690656952-34342d5c2899?auto=format&fit=crop&w=600&q=80" 
  },
  {
      id: 4,
      title: "10 Superfoods You Should be Eating Every Day",
      category: "Wellness",
      date: "18 April 2026",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" 
  },
];

export const FAQS = [
  {
      q: "What is your return policy?",
      a: "We offer a 30-day money-back guarantee on all our products. If you are not satisfied with your purchase, simply contact us for a full refund."
  },
  {
      q: "How do I track my order?",
      a: "Once your order is shipped, you will receive an email with a tracking number. You can also track your order status in your account dashboard."
  },
  {
      q: "Do you ship internationally?",
      a: "Currently, we only ship within the United States. We are working on expanding our shipping capabilities to other countries in the future."
  },
  {
      q: "Are your products organic?",
      a: "Yes! All our vegetables and fruits are 100% organic and sourced directly from certified farmers."
  }
];

export const JOBS = [
  { title: "Senior Frontend Developer", type: "Full-time", dept: "Engineering", loc: "Remote" },
  { title: "Product Designer", type: "Full-time", dept: "Design", loc: "New York, NY" },
  { title: "Customer Success Manager", type: "Full-time", dept: "Support", loc: "London, UK" },
  { title: "Marketing Specialist", type: "Contract", dept: "Marketing", loc: "Remote" },
];