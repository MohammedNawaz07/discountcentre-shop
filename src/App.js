import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Menu, 
  X,
  Star,
  Percent,
  Truck,
  Shield,
  Baby,
  Heart,
  Package,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Send,
  MessageCircle,
  User,
  CreditCard,
  ZoomIn,
  Check,
  ImageIcon,
  Instagram
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const WHATSAPP_NUMBER = "+918197783024";
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about your products.";
const INSTAGRAM_URL = "https://www.instagram.com/discount_centre_karkala?igsh=MXJmeGV4YW5mMXp0OA==";
// Cart Context
const CartContext = createContext();

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, selectedSize = null) => {
    const cartItemId = selectedSize ? `${product.id}-${selectedSize.size}` : `${product.id}`;
    const price = selectedSize ? selectedSize.price : product.discountPrice;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        cartItemId,
        selectedSize: selectedSize?.size || null,
        discountPrice: price,
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Store information
const storeInfo = {
  name: "Discount Centre",
  nameKannada: "ಡಿಸ್ಕೌಂಟ್ ಸೆಂಟರ್",
  tagline: "Your Family's Hygiene & Care Partner",
  description: "Wholesale & Retail store offering quality products at prices below MRP. From baby care to household essentials, we've got everything your family needs.",
  phone: "+91 81977 83024",
  email: "Mahammedmukthar07@gmail.com",
  address: "07, Banglegudde, Near Banglegudde Junction, Karkala, Karnataka - 576117",
  gstin: "29CQOPM7443M1ZW",
  hours: [
    { day: "Monday", time: "9:00 AM - 10:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 10:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 10:00 PM" },
    { day: "Thursday", time: "9:00 AM - 10:00 PM" },
    { day: "Friday", time: "9:00 AM - 10:00 PM" },
    { day: "Saturday", time: "9:00 AM - 10:00 PM" },
    { day: "Sunday", time: "9:00 AM - 8:30 PM" },
  ]
};

// Product categories
const categories = [
  { id: 1, name: "Baby Care", description: "Diapers, wipes & more", icon: Baby, color: "bg-blue-50" },
  { id: 2, name: "Adult Diapers", description: "Premium adult care", icon: Heart, color: "bg-purple-50" },
  { id: 3, name: "Hygiene Products", description: "Sanitary & period care", icon: Shield, color: "bg-pink-50" },
  { id: 4, name: "Baby Accessories", description: "Bottles, clothes & more", icon: Package, color: "bg-teal-50" },
  { id: 5, name: "Baby Toys", description: "Battery Cars, motorcycle & Dolls", icon: Truck, color: "bg-green-50" }
];

// All Products with multiple images and size options
const allProducts = [
   {
    id: 1,
    name: "Baby Bottle with Filter & Sipper",
    category: "Baby Accessories",
    description: "Large 525ml capacity for all-day hydration. Built-in filter for cleaner drinking water. Easy-to-use sipper lid for toddlers. Leak-proof design to prevent spills. Made from safe and baby-friendly materials.Lightweight and easy to carry.",
    originalPrice: 999,
    discountPrice: 450,
    badge: "Popular",
    hasSizes: false,
    images: ["/images/Bottle-filter-hanging-sipper.jpeg"]
  },
  {
    id: 2,
    name: "Baby Bottle with Sipper & Hanging Belt",
    category: "Baby Accessories",
    description: "Comfortable sipper for easy drinking. Hanging belt for easy carrying. Spill-resistant design. Lightweight and durable bottle. Ideal for school, travel, and outdoor use. Easy to clean and refill.",
    originalPrice: 699,
    discountPrice: 350,
    badge: "Popular",
    hasSizes: false,
    images: [
      "/images/bottle-sipper-hanging-belt.jpeg"
    ]
  },
  {
    id: 3,
    name: "Baby Bottle with Sipper",
    category: "Baby Accessories",
    description: "500ml capacity ideal for daily use. Soft and comfortable baby sipper. Leak-proof design to avoid mess. Durable and lightweight construction. Easy-grip design for small hands. Suitable for babies and toddlers.",
    originalPrice: 799,
    discountPrice: 380,
    badge: "Popular",
    hasSizes: false,
    images: [
      "/images/baby-bottle-sipper.jpeg"
    ]
  },
  {
    id: 4,
    name: "Baby Steel 3 in 1 Bottle (Sipper, Feeding Bottle, Water Bottle)",
    category: "Baby Accessories",
    description: "3-in-1 design: feeding bottle, sipper bottle, and water bottle. 180ml capacity, perfect for babies. Made with high-quality stainless steel. Hygienic and easy to clean. Durable and long-lasting. Safe for everyday baby use.",
    originalPrice: 999,
    discountPrice: 650,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/steel-3in1-bottle.jpeg"
    ]
  },
  {
    id: 5,
    name: "Baby Feeding Steel Bottle",
    category: "Baby Accessories",
    description: "Made from Food-Grade Stainless Steel 304. Safe, hygienic, and BPA-free. Durable and rust-resistant design. Helps maintain liquid temperature longer. Easy to clean and reusable. Ideal for milk, water, or baby formula.",
    originalPrice: 999,
    discountPrice: 450,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      {size: "150ml", price : 300, stock: true},
      {size: "200ml", price : 350, stock: true},
      {size: "250ml", price : 380, stock: true},
      {size: "300ml", price : 400, stock: true},
    ],
    images: [
      "/images/feeding-steel-bottle.jpeg"
    ]
  },
  {
    id: 6,
    name: "REAL CARE Sanitary Pads-XXL",
    category: "Adult Diapers",
    description: "XXL size for extra coverage and protection. High absorbency core for long-lasting dryness. Leak-proof design to prevent side leakage. Soft and comfortable top layer for sensitive skin. Secure adhesive backing to keep the pad in place. Suitable for day and overnight protection.",
    originalPrice: 499,
    discountPrice: 320,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/RealCare-sanitary-pad1.jpeg","/images/RealCare-sanitary-pad2.jpeg","/images/RealCare-sanitary-pad3.jpeg"
    ]
  },
  {
    id: 7,
    name: "Baby SebaMed Face & Body Wash Foam-400ml",
    category: "Hygiene Products",
    description: "Gentle foam formula suitable for delicate baby skin. Soap-free cleanser that cleans without causing dryness. Maintains the natural skin pH balance of 5.5. Dermatologically tested for safe baby care. Leaves skin soft, smooth, and moisturized. Suitable for both face and body cleansing. Easy-to-use pump foam bottle for convenient application.",
    originalPrice: 699,
    discountPrice: 530,
    badge: "Popular",
    hasSizes: true,
    sizes: [
      { size: "50ml", price: 480, stock: true },
      { size: "100ml", price: 530, stock: true },
      { size: "200ml", price: 580, stock: true },
      { size: "400ml", price: 620, stock: true }
    ],
    images: [
      "/images/Sebamad-facebody-foam.jpeg"
    ]
  },
  {
    id: 8,
    name: "Baby SebaMed Gentle Wash-400ml",
    category: "Hygiene Products",
    description: "Gentle cleanser specially formulated for delicate baby skin. Soap-free formula that cleans without causing dryness or irritation. Maintains the natural skin pH balance of 5.5. Dermatologically tested and safe for everyday baby care. Helps protect the baby’s natural skin barrier. Leaves skin soft, smooth, and healthy. Suitable for daily use on baby’s body and face.",
    originalPrice: 699,
    discountPrice: 530,
    badge: "Popular",
    hasSizes: true,
    sizes: [
      { size: "50ml", price: 480, stock: true },
      { size: "100ml", price: 530, stock: true },
      { size: "200ml", price: 580, stock: true },
      { size: "400ml", price: 620, stock: true }
    ],
    images: [
      "/images/sedamed-gentle-wash.jpeg"
    ]
  },
  {
    id: 9,
    name: "Baby SebaMed Powder",
    category: "Hygiene Products",
    description: "Gentle cleanser specially formuGentle baby powder suitable for delicate and sensitive skin. Helps absorb excess moisture and keeps skin dry. Maintains the natural skin pH balance of 5.5. Dermatologically tested for safe baby care. Helps prevent skin irritation and rashes. Leaves baby’s skin soft, smooth, and fresh. Ideal for daily use after bath or diaper change.",
    originalPrice: 699,
    discountPrice: 530,
    badge: "Popular",
    hasSizes: true,
    sizes: [
      { size: "100ml", price: 530, stock: true },
      { size: "200ml", price: 580, stock: true },
      { size: "400ml", price: 620, stock: true }
    ],
    images: [
      "/images/sedmed-baby-powder.jpeg"
    ]
  },
  {
    id:10,
    name: "Baby SebaMed Protective Facial Cream",
    category: "Hygiene Products",
    description: "Gentle moisturizing cream specially formulated for delicate baby facial skin. Helps protect baby’s skin from dryness and irritation. Maintains the natural skin pH balance of 5.5. Dermatologically tested and safe for sensitive skin. Provides long-lasting hydration and nourishment. Supports the skin’s natural protective barrier. Leaves baby’s skin soft, smooth, and healthy.",
    originalPrice: 699,
    discountPrice: 530,
    badge: "Popular",
    hasSizes: true,
    sizes: [
      { size: "100ml", price: 530, stock: true },
      { size: "200ml", price: 580, stock: true },
    ],
    images: [
      "/images/sedamed-facial-cream.jpeg"
    ]
  },
  {
    id: 11,
    name: "Baby Nail Cutter Set Combo",
    category: "Baby Care",
    description: "Specially designed nail cutter set for safe baby nail trimming. Smooth and rounded edges to prevent accidental cuts. Made from high-quality, durable materials. Easy-grip design for better control and safety. Compact and lightweight for convenient use and storage. Suitable for newborns and toddlers. Helps keep baby’s nails clean and well maintained.",
    originalPrice: 499,
    discountPrice: 150,
    badge: "Premium",
    hasSizes: false,
    images: [
      "/images/nailcutter-combo.jpeg"
    ]
  },
  {
    id: 12,
    name: "Baby Food Carry Container Box",
    category: "Baby Accessories",
    description: "Convenient container designed for carrying baby food safely. Made from food-grade, baby-safe materials. Leak-proof lid to prevent spills during travel. Lightweight and compact for easy carrying. Keeps food fresh and hygienic for longer time. Easy to open, close, and clean. Ideal for travel, outings, and daily use.",
    originalPrice: 599,
    discountPrice: 390,
    badge: "Top Deal",
    hasSizes: false,
    images: [
      "/images/baby-food-box.jpeg"
    ]
  },
  {
    id: 13,
    name: "Baby Teether With Fruit Filter Play Nipple",
    category: "Baby Care",
    description: "Soft baby teether designed to soothe teething discomfort. Built-in fruit filter allows safe feeding of small fruit pieces. Made from food-grade, baby-safe materials. Easy-grip handle suitable for small baby hands. Helps babies safely explore new tastes and textures. Simple to clean and reusable for daily use. Suitable for infants and toddlers during teething stages.",
    originalPrice: 349,
    discountPrice: 230,
    badge: "Top Deal",
    hasSizes: false,
    images: [
      "/images/teether-fruitfilter-nipple1.jpeg","/images/teether-fruitfilter-nipple2.jpeg","/images/teether-fruitfilter-nipple3.jpeg"
    ]
  },
  {
    id: 14,
    name: "Baby Blanket With Teddy",
    category: "Baby Care",
    description: "Soft and comfortable blanket suitable for babies. Cute teddy design that babies love. Made from gentle, baby-friendly fabric. Keeps baby warm and cozy in all seasons. Lightweight and easy to carry while traveling. Perfect for sleeping, cuddling, and daily use. Easy to wash and maintain.",
    originalPrice: 999,
    discountPrice: 750,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/teddy-blanket1.jpeg","/images/teddy-blanket2.jpeg","/images/teddy-blanket3.jpeg","/images/teddy-blanket4.jpeg"
    ]
  },
  {
    id: 15,
    name: "Baby Food (6 month-24 month)",
    category: "Baby Care",
    description: "Nutritious baby food suitable for infants aged 6 to 24 months. Provides essential vitamins and minerals for healthy growth. Easy to digest and gentle on baby’s stomach. Made with safe and baby-friendly ingredients. Supports healthy development and energy needs. Convenient and easy to prepare. Ideal for daily feeding during early growth stages.",
    originalPrice: 339,
    discountPrice: 320,
    badge: "Natural Ingredients",
    hasSizes: false,
    images: [
      "/images/baby-food1.jpeg","/images/baby-food2.jpeg"
    ]
  },
  {
    id: 16,
    name: "Baby Bib",
    category: "Hygiene Products",
    description: "Soft and comfortable bib designed for babies. Protects baby clothes from food spills and drooling. Made from safe and gentle baby-friendly fabric. Lightweight and comfortable for everyday use. Easy-to-use neck closure for secure fitting Suitable for feeding time and daily wear. Easy to wash and reusable.",
    originalPrice: 150,
    discountPrice: 75,
    badge: "Hot Deal",
    hasSizes: false,
    images: [
      "/images/baby-bib1.jpeg","/images/baby-bib2.jpeg"
    ]
  },
  {
    id: 17,
    name: "Cotton Sleeping Bag",
    category: "Baby Care",
    description: "Soft cotton sleeping bag designed for comfortable baby sleep. Made from breathable, baby-friendly cotton fabric. Keeps baby warm and cozy during sleep. Lightweight and gentle on delicate baby skin. Easy zipper design for convenient use. Suitable for home use and travel. Easy to wash and maintain.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Best Value",
    hasSizes: false,
    images: [
      "/images/cotten-sleeping-bag1.jpeg","/images/cotton-sleeping-bag2.jpeg","/images/cotton-sleeping-bag3.jpeg","/images/cotton-sleeping-bag4.jpeg"
    ]
  },
  {
    id: 18,
    name: "Cotton Net Bedding",
    category: "Baby Accessories",
    description: "Soft cotton net bedding designed for baby comfort. Made from breathable and baby-friendly cotton fabric. Provides a comfortable and safe sleeping surface for babies. Lightweight and gentle on delicate baby skin. Helps maintain proper airflow and ventilation. Suitable for cradles, cots, and baby beds. Easy to clean and maintain for daily use.",
    originalPrice: 1299,
    discountPrice: 950,
    badge: "Best Quality",
    hasSizes: false,
    images: [
      "/images/cotton-net-bedding1.jpeg","/images/cotton-net-bedding2.jpeg"
    ]
  },
  {
    id: 19,
    name: "Baby Shoes(3 month - 2 years)",
    category: "Baby Accessories",
    description: "Soft and comfortable shoes designed for babies aged 3 months to 2 years. Made from baby-friendly and breathable materials. Lightweight design for easy movement and comfort. Non-slip sole for better grip and safety. Gentle fit that protects delicate baby feet. Stylish design suitable for everyday wear. Easy to wear and remove.",
    originalPrice: 599,
    discountPrice: 280,
    badge: "Best Seller",
    hasSizes: true,
    sizes: [
      { size: "12", price: 280, stock: true },
      { size: "13", price: 280, stock: true },
      { size: "14", price: 280, stock: true }
    ],
    images: [
      "/images/baby-shoes.jpeg"
    ]
  },
  {
    id: 20,
    name: "Cotton Towel With Hood",
    category: "Baby Accessories",
    description: "Soft cotton towel designed for gentle baby care. Hooded design helps keep baby’s head warm after bath. Made from breathable and baby-friendly cotton fabric. Highly absorbent for quick drying. Lightweight and comfortable for everyday use. Gentle on delicate baby skin. Easy to wash and maintain.",
    originalPrice: 1299,
    discountPrice: 850,
    badge: "75 x 75cm",
    hasSizes: false,
    images: [
      "/images/cotton-towel-hood.jpeg"
    ]
  },
  {
    id: 21,
    name: "Baby Helicopter Straw Sipper(250ml)",
    category: "Baby Accessories",
    description: "Fun helicopter design that attracts babies and toddlers. 250ml capacity suitable for daily hydration. Built-in straw sipper for easy drinking. Leak-proof lid to prevent spills.",
    originalPrice: 699,
    discountPrice: 380,
    badge: "Top Product",
    hasSizes: false,
    images: [
      "/images/helicopter-bottle.jpeg"
    ]
  },
  {
    id: 45,
    name: "Baby Powder Puff",
    category: "Baby Accessories",
    description: "Baby Powder Puff: Soft and gentle plush fabric puff designed for smooth and even application of baby powder, skin-friendly and delicate on baby’s sensitive skin, helps spread powder evenly without irritation, features a comfortable grip strap for easy handling, lightweight and reusable, and ideal for daily baby grooming and hygiene care.",
    originalPrice: 599,
    discountPrice: 300,
    badge: "Cute Product",
    hasSizes: false,
    images: [
      "/images/powder-puff.jpeg"
    ]
  },
  {
    id: 22,
    name: "Baby Mini Sandle(6 month-2 years)",
    category: "Baby Care",
    description: "Soft and comfortable mini sandals designed for babies aged 6 months to 2 years. Made from baby-friendly and breathable materials. Lightweight design for easy movement and comfort. Non-slip sole for better grip and safety. Gentle fit that protects delicate baby feet.",
    originalPrice: 599,
    discountPrice: 300,
    badge: "Best Quality",
    hasSizes: false,
    images: [
      "/images/mini-sandle.jpeg"
    ]
  },
  {
    id: 23,
    name: "Baby Knee Protection Pad",
    category: "Baby Care",
    description: "Soft knee pads designed to protect baby’s knees while crawling. Made from breathable and baby-friendly fabric. Elastic design ensures a comfortable and secure fit. Helps prevent scratches and irritation on delicate skin.",
    originalPrice: 399,
    discountPrice: 150,
    badge: "No.1 Brand",
    hasSizes: false,
    images: [
      "/images/knee-pad.jpeg"
    ]
  },
  {
    id: 24,
    name: "New Born Baby Socks (0 to 6 months)",
    category: "Baby Care",
    description: "Soft and comfortable socks designed for newborn babies (0–6 months). Made from gentle and breathable baby-friendly fabric. Keeps baby’s feet warm and cozy. Stretchable material for a comfortable fit. Lightweight and safe for delicate baby skin.",
    originalPrice: 299,
    discountPrice: 120,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/new-baby-socks.jpeg"
    ]
  },
  {
    id: 25,
    name: "Baby Gloves Teether",
    category: "Baby Care",
    description: "Soft glove-style teether designed for babies during the teething stage. Helps soothe sore gums and reduce teething discomfort. Made from food-grade, baby-safe silicone and fabric. Adjustable strap ensures a secure and comfortable fit. Prevents babies from scratching their face with sharp nails.",
    originalPrice: 199,
    discountPrice: 130,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/baby-gloves-teether.jpeg"
    ]
  },
  {
    id: 26,
    name: "Baby Girl Socks with HairBand",
    category: "Baby Accessories",
    description: "Soft and comfortable socks designed for baby girls. Matching hairband set for a cute and stylish look. Made from gentle, breathable baby-friendly fabric. Keeps baby’s feet warm and cozy.",
    originalPrice: 499,
    discountPrice: 250,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/girl-sock-hairband.jpeg"
    ]
  },
  {
    id: 27,
    name: "Deluxe Multi-Functional Baasinet (3 in 1)",
    category: "Baby Accessories",
    description: "3-in-1 multifunctional bassinet designed for baby sleeping, resting, and relaxing. Strong and durable frame for better stability and safety. Soft and comfortable bedding for peaceful baby sleep. Lightweight design with easy portability. Breathable mesh sides for better airflow and visibility.",
    originalPrice: 12999,
    discountPrice: 7999,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/deluxe-3in1-1.jpeg","/images/deluxe-3in1-2.jpeg","/images/deluxe-3in1-3.jpeg"
    ]
  },

  {
    id: 28,
    name: "Baby Carry Nest-Soft",
    category: "Baby Care",
    description: "Baby Carry Nest – Soft: Made with extra-soft padded fabric to keep babies comfortable and secure, featuring breathable and skin-friendly material, proper support for baby’s head, neck, and back, adjustable straps for a secure and comfortable fit, lightweight and easy to carry design, and ideal for travel, outings, and everyday baby care.",
    originalPrice: 1699,
    discountPrice: 1250,
    badge: "Soft-Comfort",
    hasSizes: false,
    images: [
      "/images/carry-nest1.jpeg","/images/carry-nest2.jpeg"
    ]
  },
  {
    id: 29,
    name: "Baby Carry Nest",
    category: "Baby Care",
    description: "Baby Carry Nest: Soft and comfortable padded baby carrier nest designed to keep babies safe and cozy, made with breathable and skin-friendly fabric, provides proper support for baby’s head, neck, and back, features adjustable straps for a secure and comfortable fit, lightweight and easy to carry, and ideal for travel, outings, and daily baby care.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/carry-nest21.jpeg","/images/carry-nest22.jpeg"
    ]
  },
  {
    id: 30,
    name: "Baby Carry Belt",
    category: "Baby Accessories",
    description: "Baby Carry Belt: Designed for safe and comfortable baby carrying, made with soft padded and breathable material to support both parent and baby, features a strong adjustable belt for a secure fit, ergonomic design to support the baby’s back and hips, hands-free carrying convenience, and lightweight durable construction—ideal for travel, shopping, and daily use.",
    originalPrice: 1200,
    discountPrice: 750,
    badge: "Baby Care",
    hasSizes: false,
    images: [
      "/images/carry-belt1.jpeg","/images/carry-belt2.jpeg","/images/carry-belt3.jpeg","/images/carry-belt4.jpeg"
    ]
  },
  {
    id: 31,
    name: "Econap-Adult Diaper(L)",
    category: "Adult Diapers",
    description: "Econap Adult Diaper (L): Designed for reliable comfort and protection, made with soft and breathable material that is gentle on the skin, featuring a high absorbent core for long-lasting dryness, leak-proof side barriers to prevent spills, adjustable tabs for a secure fit, and odor control protection to maintain freshness—ideal for daily and overnight adult care.",
    originalPrice: 750,
    discountPrice: 330,
    badge: "Adult Diapers",
    hasSizes: false,
    images: [
      "/images/econap1.jpeg","/images/econap2.jpeg"
    ]
  },
  {
    id: 32,
    name: "GoodDry Baby-Pants Diaper",
    category: "Hygiene Products",
    description: "GoodDry Baby Pants Diaper: Made with soft, breathable material that is gentle on baby’s delicate skin, featuring a high absorbent core for long-lasting dryness, leak-proof side guards to prevent spills, a 360° stretchable waistband for a snug and comfortable fit, and an easy pull-up pant style for quick changing—perfect for keeping babies dry, comfortable, and protected day and night.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Baby Care",
    hasSizes: true,
    sizes: [
      { size: "S (75pc)", price: 550, stock: true },
      { size: "M (75pc)", price: 570, stock: true },
      { size: "L (75pc)", price: 580, stock: true },
      { size: "XL (60pc)", price: 600, stock: true },
      { size: "XXL (56pc)", price: 620, stock: true }
    ],
    images: [
      "/images/good-dry1.jpeg","/images/good-dry2.jpeg"
    ]
  },
  {
    id: 33,
    name: "AbsorbiaActive-Adult Diaper Pants",
    category: "Adult Diapers",
    description: "Absorbia Active – Adult Diaper Pants: Designed for active adults, made with soft breathable material for maximum comfort, featuring a super absorbent core that locks moisture quickly, leak-proof side guards for reliable protection, 360° stretchable waistband for a snug and flexible fit, and an easy pull-up pant style for convenient wearing and removal—ideal for day and night protection with freedom of movement.",
    originalPrice: 600,
    discountPrice: 300,
    badge: "Adult Care",
    hasSizes: true,
    sizes: [
      { size: "M (10pc)", price: 300, stock: true },
      { size: "L (10pc)", price: 350, stock: true },
      { size: "XL (10pc)", price: 380, stock: true },
      { size: "XXL (10pc)", price: 400, stock: true },
      { size: "XXXL (10pc)", price: 450, stock: true }
    ],
    images: [
      "/images/AbsorbiaActive1.jpeg","/images/AbsorbiaActive2.jpeg"
    ]
  },
  {
    id: 34,
    name: "Absorbia UnderPads",
    category: "Adult Diapers",
    description: "Absorbia UnderPads: Designed for maximum protection against leaks and spills, made with soft, skin-friendly top layer for comfort, featuring a high absorbent core that quickly locks in moisture, waterproof backing to protect beds and surfaces, large coverage area for better protection, and disposable hygienic design—ideal for baby care, adult care, and patient use.",
    originalPrice: 1500,
    discountPrice: 250,
    badge: "Adult Care",
    hasSizes: true,
    sizes: [
      { size: "60x90cms (10pc)", price: 250, stock: true }
     ],
    images: [
      "/images/underpad1.jpeg","/images/underpad2.jpeg"
    ]
  },
  {
    id: 35,
    name: "Absorbia Premium Adult Diapers",
    category: "Adult Diapers",
    description: "Absorbia Premium Adult Diapers: Designed for maximum comfort and protection, made with soft breathable material that is gentle on the skin, featuring a high absorbent core for long-lasting dryness, leak-proof side guards to prevent spills, an adjustable secure fit for better comfort, and odor control technology to maintain freshness—ideal for day and night use for adults needing reliable protection.",
    originalPrice: 600,
    discountPrice: 350,
    badge: "Best Seller",
    hasSizes: true,
    sizes: [
      { size: "M (10pc)", price: 350, stock: true },
      { size: "L (10pc)", price: 380, stock: true },
      { size: "XL (10pc)", price: 400, stock: true }
    ],
    images: [
      "/images/Absorbia-premium-adult.jpeg"
    ]
  },
  {
    id: 36,
    name: "Absorbia Baby Diapers Pant",
    category: "Hygiene Products",
    description: "Absorbia Baby Diapers Pant: Crafted with soft, skin-friendly material for gentle comfort, featuring a high absorbent core that quickly locks moisture to keep the baby dry, leak-proof side guards for extra protection, a 360° stretchable waistband for a secure and comfortable fit, and an easy pull-up pant style for quick changing—perfect for all-day and overnight dryness.",
    originalPrice: 1199,
    discountPrice: 550,
    badge: "Best Seller",
    hasSizes: true,
    sizes: [
      { size: "XS (84pc)", price: 550, stock: true },
      { size: "S (78pc)", price: 550, stock: true },
      { size: "M (72pc)", price: 550, stock: true },
      { size: "L (62pc)", price: 550, stock: true },
      { size: "XL (54pc)", price: 550, stock: true },
      { size: "XXL (48pc)", price: 550, stock: true }
    ],
    images: [
      "/images/Absorbia-baby-pants.jpeg","/images/Absorbia-baby-pants2.jpeg","/images/Absorbia-baby-pants3.jpeg"
    ]
  },
  {
    id: 37,
    name: "Honey Bunny Baby Pants",
    category: "Hygiene Products",
    description: "Honey Boney Baby Pants: Made with soft and breathable material that is gentle on baby’s delicate skin, super absorbent core for long-lasting dryness, leak-proof side barriers to prevent spills, 360° stretchable waistband for a snug and comfortable fit, and easy pull-up pant style for quick wearing and removal—ideal for keeping babies dry, comfortable, and protected throughout the day and night.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "XS (84pc)", price: 550, stock: true },
      { size: "S (78pc)", price: 550, stock: true },
      { size: "M (72pc)", price: 550, stock: true },
      { size: "L (62pc)", price: 550, stock: true }
    ],
    images: [
      "/images/honey-boney.jpeg"
    ]
  },
  {
    id: 38,
    name: "BeBe Baby Diaper(Premature)",
    category: "Hygiene Products",
    description: "BeBe Baby Diaper (Premature): Specially designed for premature and newborn babies, made with ultra-soft breathable material that is gentle on delicate skin, high absorbent core for quick moisture lock, leak-proof side guards to prevent spills, soft flexible waistband for a comfortable fit, and skin-friendly design to help keep the baby dry, safe, and comfortable.",
    originalPrice: 499,
    discountPrice: 350,
    badge: "Top Product",
    hasSizes: true,
     sizes: [
      { size: "1.5-3kg (20pc)", price: 350, stock: true }
     ],
    images: [
      "/images/bebe-premium-pants.jpeg"
    ]
  },
  {
    id: 39,
    name: "BeBe baby Smart Pants",
    category: "Hygiene Products",
    description: "BeBe Baby Smart Pants: Designed with soft cottony material that is gentle on baby’s delicate skin, super absorbent core for long-lasting dryness, leak-proof side guards to prevent spills, 360° stretchable waistband for a snug and comfortable fit, breathable layers to keep baby fresh, and an easy pull-up pant style for quick wearing and removal—perfect for day and night protection.",
    originalPrice: 1199,
    discountPrice: 650,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "S (84pc)", price: 650, stock: true },
      { size: "M (78pc)", price: 650, stock: true },
      { size: "L (64pc)", price: 650, stock: true },
      { size: "XL (56pc)", price: 650, stock: true }
    ],
    images: [
      "/images/bebe-baby-pants1.jpeg","/images/bebe-baby-pants2.jpeg"
    ]
  },
  {
    id: 40,
    name: "Huggies Baby Pants",
    category: "Hygiene Products",
    description: "Huggies Baby Pants: Made with ultra-soft breathable material that is gentle on baby’s skin, high absorbent core for long-lasting dryness, leak-lock protection to prevent side leakage, 360° stretchable waistband for a snug and comfortable fit, quick-dry layer to keep baby dry and rash-free, and easy pull-up pant style for convenient wearing and removal, ideal for both day and night use.",
    originalPrice: 1399,
    discountPrice: 750,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "M (76pc)", price: 750, stock: true },
      { size: "L (64pc)", price: 750, stock: true }
    ],
    images: [
      "/images/huggies.jpeg"
    ]
  },
  {
    id: 41,
    name: "LuvLap Diaper Pants",
    category: "Hygiene Products",
    description: "LuvLap Diaper Pants: Soft cottony material gentle on baby’s delicate skin, high absorbent core for long-lasting dryness, leak-guard protection to prevent side leakage, 360° stretchable waistband for a comfortable and secure fit, breathable design to keep baby fresh, easy pull-up pant style for quick wearing and removal, suitable for day and night use.",
    originalPrice: 999,
    discountPrice: 570,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "S (78pc)", price: 570, stock: true },
      { size: "M (72pc)", price: 570, stock: true },
      { size: "L (62pc)", price: 570, stock: true },
      { size: "XL (54pc)", price: 570, stock: true }
    ],
    images: [
      "/images/luvlap-pants.jpeg"
    ]
  },
  {
    id: 42,
    name: "LuvLap Baby Diapers-Premium",
    category: "Hygiene Products",
    description: "LuvLap Baby Diapers – Premium: Ultra-soft cottony material gentle on baby’s skin, high absorbency core for long-lasting dryness, leak-proof side barriers to prevent spills, breathable design to keep baby comfortable, stretchable waistband for a snug and secure fit, skin-friendly and rash-free protection, ideal for day and night use.",
    originalPrice: 949,
    discountPrice: 650,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "S (78pc)", price: 650, stock: true },
      { size: "M (72pc)", price: 650, stock: true },
      { size: "L (62pc)", price: 650, stock: true }
    ],
    images: [
      "/images/luvlap-premium.jpeg"
    ]
  },
  {
    id: 43,
    name: "Baby Brush Combo-(8pcs)",
    category: "Baby Care",
    description: "Complete 8-piece grooming set designed for gentle baby care, includes soft-bristle brush and comb for delicate hair, baby nail cutter and scissors for safe trimming, nasal cleaner and grooming tools for hygiene, made from safe and baby-friendly materials, compact and lightweight, and perfect for daily baby grooming and care.",
    originalPrice: 400,
    discountPrice: 320,
    badge: "Best Quality",
    hasSizes: false,
    images: [
      "/images/baby-brush1.jpeg","/images/baby-brush2.jpeg"
    ]
  },
  {
    id: 44,
    name: "Baby Girl Frock Dress",
    category: "Baby Accessories",
    description: "Baby Girl Frock Dress: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish frock design perfect for baby girls, easy to wear and remove, gentle on delicate baby skin, suitable for daily wear, outings, and special occasions, and durable stitching for long-lasting use.",
    originalPrice: 1599,
    discountPrice: 950,
    badge: "Best Quality",
    hasSizes: true,
    sizes: [
      { size: "1-2 years", price: 950, stock: true }

    ],
    images: [
      "/images/baby-girl-frock1.jpeg","/images/baby-girl-frock2.jpeg"
    ]
  },
  {
    id: 46,
    name: "JEEP MJ 136",
    category: "Baby Toys",
    description: "JEEP MJ 136: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4*45W), Charger-12V 1000mA, Maximum Load-80kg, Applicable Age-3-10yrs.",
    originalPrice: 30000,
    discountPrice: 25000,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-136.jpeg"
    ]
  },
  {
    id: 47,
    name: "JEEP MJ 180P",
    category: "Baby Toys",
    description: "JEEP MJ 180P: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-35kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12900,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-180p.jpeg"
    ]
  },
  {
    id: 48,
    name: "JEEP MJ 179P",
    category: "Baby Toys",
    description: "JEEP MJ 179P: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12900,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-179p.jpeg"
    ]
  },
  {
    id: 49,
    name: "JEEP MJ 178P",
    category: "Baby Toys",
    description: "JEEP MJ 178P: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 11800,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-178p.jpeg"
    ]
  },
  {
    id: 50,
    name: "JEEP MJ 1365P",
    category: "Baby Toys",
    description: "JEEP MJ 1365P: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12800,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-1365p.jpeg"
    ]
  },
  {
    id: 51,
    name: "JEEP MJ 117P",
    category: "Baby Toys",
    description: "JEEP MJ 117P: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 11500,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-117p.jpeg"
    ]
  },
  {
    id: 52,
    name: "JEEP MJ 180N",
    category: "Baby Toys",
    description: "JEEP MJ 180N: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12000,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-180n.jpeg"
    ]
  },
  {
    id: 53,
    name: "JEEP MJ 179N",
    category: "Baby Toys",
    description: "JEEP MJ 179N: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12500,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-179n.jpeg"
    ]
  },
  {
    id: 54,
    name: "JEEP MJ 117N",
    category: "Baby Toys",
    description: "JEEP MJ 117N: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 12500,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-117n.jpeg"
    ]
  },
  {
    id: 55,
    name: "JEEP MJ 118",
    category: "Baby Toys",
    description: "JEEP MJ 118: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 9500,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-118.jpeg"
    ]
  },
   {
    id: 56,
    name: "JEEP MJ 114",
    category: "Baby Toys",
    description: "JEEP MJ 114: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 9000,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-9000.jpeg","/images/jeep-9000-1.jpeg"
    ]
  },
   {
    id: 57,
    name: "JEEP MJ 115",
    category: "Baby Toys",
    description: "JEEP MJ 115: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 8800,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-8800.jpeg"
    ]
  },
   {
    id: 58,
    name: "JEEP MJ 116",
    category: "Baby Toys",
    description: "JEEP MJ 116: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 8900,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-8900.jpeg"
    ] 
  },
   {
    id: 59,
    name: "JEEP MJ 4x4",
    category: "Baby Toys",
    description: "JEEP MJ 4x4: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 8500,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-8500.jpeg"
    ]
  },
   {
    id: 60,
    name: "JEEP MJ 136",
    category: "Baby Toys",
    description: "JEEP MJ 136: Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 15000,
    discountPrice: 8400,
    badge: "Super Hot",
    hasSizes: false,
    images: [
      "/images/jeep-8400.jpeg"
    ]
  },
  {
    id: 61,
    name: "Baby Brush(2-6yrs)-Ultrsoft",
    category: "Hygiene Products",
    description: "Baby Brush (2–6 Years) – Ultra Soft: Specially designed for kids aged 2–6 years, this toothbrush features ultra-soft bristles that gently clean teeth and gums without irritation, a small brush head for easy reach inside a child’s mouth, and a comfortable non-slip handle for better grip. It helps protect sensitive gums, remove plaque effectively, and encourage healthy brushing habits for growing children. 🪥👶✨",
    originalPrice: 99,
    discountPrice: 50,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/baby-brush-2to6.jpeg"
    ]
  },
  {
    id: 62,
    name: "Baby Adjustable Pillow",
    category: "Baby Care",
    description: "Baby Adjustable Pillow: Soft and breathable pillow designed to support a baby’s head and neck comfortably. Its adjustable design provides proper alignment as the baby grows, while the lightweight, skin-friendly material ensures comfort during sleep or travel. 👶🛏️",
    originalPrice: 699,
    discountPrice: 220,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/baby-pillow1.jpeg","/images/baby-pillow2.jpeg"
    ]
  },
  {
    id: 63,
    name: "Baby Brush (6-12yrs)",
    category: "Hygiene Products",
    description: "Baby Brush (6–12 Years): Designed for children aged 6–12 years, this toothbrush features soft bristles for gentle yet effective cleaning, a small brush head to reach all areas of the mouth, and an easy-grip handle for comfortable brushing. It helps maintain healthy teeth and gums while encouraging good oral hygiene habits. 🪥",
    originalPrice: 199,
    discountPrice: 90,
    badge: "Best Seller",
    hasSizes: false,
    images: [
       "/images/brush-6to12.jpeg","/images/brush-6to12-1.jpeg"
    ]
  },
  {
    id: 64,
    name: "Absorbia Pads",
    category: "Adult Diapers",
    description: "Absorbia Pads: Highly absorbent pads designed to provide reliable protection against leaks and moisture. Made with soft, skin-friendly material for comfort, they help keep the surface dry and hygienic, making them ideal for adult care, or bed protection.",
    originalPrice: 299,
    discountPrice: 100,
    badge: "Buy 3 @ 100Rs",
    hasSizes: true,
     sizes: [
      { size: "XL (18pcs)", price: 100, stock: true }
    ],
    images: [
       "/images/absorbia-pads.jpeg"
    ]
  },
  {
    id: 65,
    name: "Absorbia Baby Wipes-(72pcs)",
    category: "Hygiene Products",
    description: "Absorbia Baby Wipes: Gentle, fragrance-free wipes designed for sensitive baby skin. These wipes are moistened with a mild, hypoallergenic solution that helps clean and soothe your baby’s skin without irritation. Perfect for diaper changes, spit-ups, and everyday messes. 🧼👶",
    originalPrice: 597,
    discountPrice: 199,
    badge: "Buy 1-get-2 Free",
    hasSizes: false,
    images: [
       "/images/absorbia-wipes.jpeg"
    ]
  },
  {
    id: 67,
    name: "Bonecam Pads-XXXL",
    category: "Adult Diapers",
    description: "Bonecam Pads – XXXL: Extra-large absorbent pads designed to provide maximum leak protection and long-lasting dryness. Made with soft, skin-friendly material for comfort, they help control moisture and odor while keeping the surface clean and hygienic, making them ideal for adult care and bed protection.",
    originalPrice: 399,
    discountPrice: 280,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "XXXL (40pcs)", price: 280, stock: true }
    ],
    images: [
       "/images/bonecam.jpeg"
    ]
  },
   {
    id: 68,
    name: "SOFY Bodyfit Pads-XL",
    category: "Adult Diapers",
    description: "Sofy Bodyfit Pads – XL: Soft and highly absorbent pads designed to provide reliable protection and long-lasting dryness. The body-fit shape ensures a secure and comfortable fit, while the breathable, skin-friendly material helps prevent irritation, making them ideal for everyday hygiene and comfort.",
    originalPrice: 60,
    discountPrice: 45,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "XL (6pcs)", price: 45, stock: true }
    ],
    images: [
       "/images/sofy-pro.jpeg"
    ]
  },
   {
    id: 69,
    name: "SOFY Anti-Bacteria Pads-XL",
    category: "Adult Diapers",
    description: "Sofy Anti-Bacteria Pads – XL: 🧼 Designed with anti-bacterial protection to help maintain better hygiene and freshness. These pads provide high absorbency, leak protection, and a comfortable body-fit design. Made with soft, skin-friendly material to keep you dry and confident throughout the day. ✨",
    originalPrice: 100,
    discountPrice: 70,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "XL (7pcs)", price: 70, stock: true }
    ],
    images: [
       "/images/sofy-antiB.jpeg"
    ]
  },
   {
    id: 70,
    name: "Whisper Pads-XL",
    category: "Adult Diapers",
    description: "Whisper Pads – XL: 🌸 Designed for maximum comfort and reliable protection, these pads offer high absorbency with a leak-lock system to keep you dry for longer hours. The soft, breathable material and secure fit ensure all-day freshness and confidence. ✨",
    originalPrice: 70,
    discountPrice: 50,
    badge: "Best Seller",
    hasSizes: true,
     sizes: [
      { size: "XL (6pcs)", price: 50, stock: true }
    ],
    images: [
        "/images/whisper-XL.jpeg"
    ]
  },
   {
    id: 71,
    name: "Whisper Pads-XXXL",
    category: "Adult Diapers",
    description: "Whisper Pads – XXXL: 🌸 Extra-large pads designed for maximum coverage and heavy-flow protection. Made with high absorbency technology and leak-lock protection to keep you dry and comfortable for longer hours. The soft, breathable material and secure fit provide all-day freshness, hygiene, and confidence. ✨",
    originalPrice: 450,
    discountPrice: 420,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "XXXL (20pcs)", price: 420, stock: true }
    ],
    images: [
       "/images/whisper-XXXL.jpeg"
    ]
  },
   {
    id: 72,
    name: "Whisper Choice Pads(Regular)",
    category: "Adult Diapers",
    description: "Whisper Choice Pads (Regular): 🌸 Designed for everyday comfort and reliable protection, these pads offer high absorbency with a leak-lock system to keep you dry throughout the day. The soft, breathable material and secure fit ensure all-day freshness and confidence. ✨",
    originalPrice: 110,
    discountPrice: 99,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "Regular (20pcs)", price: 99, stock: true }
    ],
    images: [
       "/images/whisper-choice-regular.jpeg"
    ]
  },
   {
    id: 73,
    name: "Whisper Choice-XL",
    category: "Adult Diapers",
    description: "Whisper Choice – XL: 🌸 Designed for maximum comfort and reliable protection, these pads offer high absorbency with a leak-lock system to keep you dry for longer hours. The soft, breathable material and secure fit ensure all-day freshness and confidence. ✨",
    originalPrice: 45,
    discountPrice: 43,
    badge: "Best Product",
    hasSizes: true,
     sizes: [
      { size: "XL (6pcs)", price: 43, stock: true }
    ],
    images: [
       "/images/whisper-choice.jpeg"
    ]
  },
  {
    id: 74,
    name: "Whisper Ultra Soft-XL",
    category: "Adult Diapers",
    description: "Whisper Ultra Soft – XL: 🌸 Designed for maximum comfort and gentle care, these pads offer superior softness and absorbency. The ultra-soft material and secure fit ensure all-day freshness and confidence, making them ideal for sensitive skin. ✨",
    originalPrice: 199,
    discountPrice: 180,
    badge: "NEW!",
    hasSizes: true,
     sizes: [
      { size: "XL (15pcs)", price: 180, stock: true }
    ],
    images: [
       "/images/whisper-soft.jpeg"
    ]
  },
  {
    id: 75,
    name: "Whisper Choice Ultra-XL",
    category: "Adult Diapers",
    description: "Whisper Choice Ultra-XL: 🌸 Designed for maximum comfort and reliable protection, these pads offer high absorbency with a leak-lock system to keep you dry for longer hours. The soft, breathable material and secure fit ensure all-day freshness and confidence. ✨",
    originalPrice: 50,
    discountPrice: 48,
    badge: "Best Product",
    hasSizes: true,
     sizes: [
      { size: "XL (6pcs)", price: 48, stock: true }
    ],
    images: [
       "/images/whisper-choice-ultra.jpeg"
    ]
  },
  {
    id: 76,
    name: "Bella Sanitary Pads",
    category: "Adult Diapers",
    description: "Bella Sanitary Pads: 🌸 Soft and comfortable sanitary pads designed to provide reliable absorbency and leak protection for everyday hygiene. Made with skin-friendly, breathable material that helps keep you dry and fresh throughout the day. The body-fit design ensures a secure and comfortable fit, offering confidence and protection during daily activities. ✨",
    originalPrice: 250,
    discountPrice: 245,
    badge: "Best Product",
    hasSizes: true,
     sizes: [
      { size: "XL (45pcs)", price: 245, stock: true }
    ],
    images: [
      "/images/bella.jpeg"
    ]
  },
   {
    id: 77,
    name: "Baby Romper",
    category: "Baby Accessories",
    description: "Baby Romper: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish romper design perfect",
    originalPrice: 250,
    discountPrice: 245,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "0-3 Months", price: 245, stock: true },
      { size: "6-9 Months", price: 245, stock: true },
      { size: "9-18 Months", price: 245, stock: true }
    ],
    images: [
      "/images/romber 1.jpeg"
    ]
  },
  {
    id: 78,
    name: "Baby Romper",
    category: "Baby Accessories",
    description: "Baby Romper: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish romper design perfect",
    originalPrice: 250,
    discountPrice: 245,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "0-3 Months", price: 245, stock: true },
      { size: "6-9 Months", price: 245, stock: true },
      { size: "9-18 Months", price: 245, stock: true }
    ],
    images: [
      "/images/romber-blue2.jpeg","/images/romber-blue1.jpeg"
    ]
  },

  {
    id: 79,
    name: "Baby Dress (Unisex)",
    category: "Baby Accessories",
    description: "Baby Dress (Unisex): Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish dress design perfect for both baby",
    originalPrice: 699,
    discountPrice: 380,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "0-6 Months", price: 380, stock: true },
      { size: "7-12 Months", price: 380, stock: true },
      { size: "1-2 Years", price: 380, stock: true },
      { size: "2-3 Years", price: 380, stock: true }
    ],
    images: [
      "/images/unisex.jpeg"
    ]
  },
  {
    id: 80,
    name: "Baby Girl Dress",    //Brown
    category: "Baby Accessories",
    description: "Baby Girl Dress: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish dress design perfect for baby girls.",
    originalPrice: 999,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "L", price: 450, stock: true },
      { size: "XL", price: 450, stock: true },
      { size: "XXL", price: 450, stock: true }
    ],
    images: [
      "/images/brown.jpeg"
    ]
  },
   {
    id: 81,
    name: "Baby Girl Dress",   //yellow
    category: "Baby Accessories",
    description: "Baby Girl Dress: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish dress design perfect for baby girls.",
    originalPrice: 999,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "L", price: 450, stock: true },
      { size: "XL", price: 450, stock: true },
      { size: "XXL", price: 450, stock: true }
    ],
    images: [
      "/images/yellow.jpeg"
    ]
  },
   {
    id: 82,
    name: "Baby Girl Dress",    //purple
    category: "Baby Accessories",
    description: "Baby Girl Dress: Soft and comfortable skin-friendly fabric, lightweight and breathable for all-day wear, cute and stylish dress design perfect for baby girls.",
    originalPrice: 999,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: true,
     sizes: [
      { size: "L", price: 450, stock: true },
      { size: "XL", price: 450, stock: true },
      { size: "XXL", price: 450, stock: true }
    ],
    images: [
      "/images/purple.jpeg"
    ]
  },
{
    id: 83,
    name: "Air Freshner",    
    category: "Hygiene Products",
    description: "Keeps your surroundings fresh and pleasant with long-lasting fragrance, helps eliminate bad odors, and is ideal for homes, offices, and cars.",
    originalPrice: 169,
    discountPrice: 150,
    badge: "Top Quality",
    hasSizes: false,
    images: [
       "/images/air-freshner1.jpeg", "/images/air-freshner2.jpeg"
    ]
  },
  {
    id: 84,
    name: "Gummy Bears Steel Water-Bottle", 
    category: "Baby Accessories",
    description: "Gummy Bears Steel Water Bottle (300ml): Cute and durable stainless steel bottle with a fun design, keeps drinks safe and hygienic, lightweight, and perfect for kids’ daily use.",
    originalPrice: 1300,
    discountPrice: 750,
    badge: "Top Quality",
    hasSizes: false,
    images: [
       "/images/bear-bottle-1.jpeg", "/images/bear-bottle-2.jpeg"
    ]
  },
  {
    id: 85,
    name: "Cute 3-in-1 Water-Bottle",   
    category: "Baby Accessories",
    description: "Cute 3-in-1 Water Bottle (500ml): Multi-functional bottle with sipper, straw, and drinking options, designed for easy use and leak-proof performance, ideal for kids and travel.",
    originalPrice: 1500,
    discountPrice: 850,
    badge: "Top Quality",
    hasSizes: false,
    images: [
     "/images/cute-bottle.jpeg", "/images/cute-bottle-1.jpeg"
    ]
  },
  {
    id: 86,
    name: "Youth Face",   
    category: "Hygiene Products",
    description: "Youth Face (Face Whitening Cream): Enriched formula that helps brighten skin tone, reduce dullness, and improve glow, suitable for daily skincare routine.",
    originalPrice: 599,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: false,
    images: [
        "/images/youth-face.jpeg", "/images/youth-face-1.jpeg"
    ]
  },
  {
    id: 87,
    name: "Baby Fruit Feeder Nibbler ",   
    category: "Baby Care",
    description: "Baby Fruit Feeder Nibbler: Safe and convenient feeder designed to introduce fruits and solids, prevents choking, and made with baby-safe, BPA-free material.",
    originalPrice: 350,
    discountPrice: 250,
    badge: "Top Quality",
    hasSizes: false,
    images: [
        "/images/fruit-feeder-1.jpeg", "/images/fruit-feeder-2.jpeg"
    ]
  },
  {
    id: 88,
    name: "Baby Dress 7-in-1",   
    category: "Baby Accessories",
    description: " Baby Dress 7-in-1: Complete clothing set including multiple coordinated pieces, made with soft and comfortable fabric, perfect for everyday wear and gifting.",
    originalPrice: 599,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: false,
    images: [
          "/images/7in1.jpeg"
    ]
  },{
    id: 89,
    name: "Baby Dress 5-in-1",   
    category: "Baby Accessories",
    description: "Baby Dress 5-in-1: Stylish and comfortable baby outfit set with essential clothing items, designed with soft, breathable fabric for all-day comfort.",
    originalPrice: 599,
    discountPrice: 450,
    badge: "Top Quality",
    hasSizes: false,
    images: [
     "/images/5in1.jpeg"
    ]
  },
    {
    id: 108,
    name: "Absorbia Baby Pants",   
    category: "Baby Care",
    description: "Absorbia Baby Pants: Highly absorbent diaper pants with leak protection and soft material, ensures long-lasting dryness and comfort for babies.",
    originalPrice: 550,
    discountPrice: 299,
    badge: "Baby Care",
    hasSizes: true,
    sizes: [
      { size: "NB (60pcs)", price: 299, stock: true },
      { size: "S (54pcs)", price: 299, stock: true },
      { size: "M (48pcs)", price: 299, stock: true },
      { size: "L (42pcs)", price: 299, stock: true },
      { size: "XL (36pcs)", price: 299, stock: true }
    ],
    images: [
     "/images/absorbia-299.jpeg"
    ]
  },
  {
    id: 90,
    name: "Bebe Baby Wipes",   
    category: "Baby Care",
    description: "Bebe Baby Wipes: Gentle and soft wipes made with skin-friendly formula, helps clean and moisturize baby’s skin, ideal for daily hygiene.",
    originalPrice: 399,
    discountPrice: 199,
    badge: "Buy 1 Get 1 Free",
    hasSizes: false,
    images: [
          "/images/bebe-wipes.jpeg"
    ]
  },
  {
    id: 91,
    name: "Bebe Smart Baby Pants -XXXL",   
    category: "Baby Care",
    description: "Bebe Smart Baby Pants – XXXL: Extra-large diaper pants designed for maximum absorbency and comfort, provides secure fit and leak protection for growing babies.",
    originalPrice: 1149,
    discountPrice: 850,
    badge: "Top Quality",
    hasSizes: true,
    sizes: [
      { size: "XXXL", price: 850, stock: true }
    ],
    images: [
         "/images/bebe-xxxl.jpeg"
    ]
  },
  {
    id: 92,
    name: "RealCare Period Panties",   
    category: "Adult Diapers",
    description: "RealCare Period Panties: Reusable and comfortable panties designed for leak protection and hygiene during periods, made with soft and breathable fabric.",
    originalPrice: 275,
    discountPrice: 200,
    badge: "Best Seller",
    hasSizes: true,
    sizes: [
      { size: "L-XL", price: 200, stock: true }
    ],
    images: [
             "/images/realcare-1.jpeg","/images/realcare-2.jpeg"
    ]
  },
  {
    id: 93,
    name: "Absorbia Baby Diaper Tape",   
    category: "Baby Care",
    description: "Absorbia Baby Diaper Tape: Comfortable diaper with secure tape fit and high absorbency, keeps baby dry, clean, and protected from leaks.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Baby Care",
    hasSizes: true,
    sizes: [
      { size: "NB (60pcs)", price: 550, stock: true },
      { size: "S (54pcs)", price: 550, stock: true },
      { size: "M (48pcs)", price: 550, stock: true },
      { size: "L (42pcs)", price: 550, stock: true },
      { size: "XL (36pcs)", price: 550, stock: true }
    ],
    images: [
     "/images/absorbia-baby-tape.jpeg"
    ]
  },
  {
    id: 107,
    name: "Absorbia Baby Pants(Offer)",   
    category: "Baby Care",
    description: "Absorbia Baby Pants (Offer – Buy 2 Get 1 Free): Premium diaper pants with excellent absorbency and leak protection, offering great value with a special combo deal.",
    originalPrice: 1199,
    discountPrice: 798,
    badge: "Buy 2 Get 1 Free",
    hasSizes: true,
    sizes: [
      { size: "NB (60pcs)", price: 798, stock: true },
      { size: "S (54pcs)", price: 798, stock: true },
      { size: "M (48pcs)", price: 798, stock: true },
      { size: "L (42pcs)", price: 798, stock: true },
      { size: "XL (36pcs)", price: 798, stock: true }
    ],
    images: [
     "/images/absorbia-798.jpeg"
    ]
  },
  {
    id: 94,
    name: "Baby Care Set",   
    category: "Baby Care",
    description: "Baby Care Set: Complete baby care kit including essential grooming and hygiene items, designed for safe, convenient, and everyday baby care.",
    originalPrice: 250,
    discountPrice: 199,
    badge: "Best Seller",
    hasSizes: false,
    images: [
           "/images/baby-set.jpeg"
    ]
  },
  {
    id: 95,
    name: "Baby Bedding With Mosquito Net",   
    category: "Baby Care",
    description: "Baby Bedding with Mosquito Net: Soft and comfortable bedding set with an attached mosquito net for complete protection, made with breathable and skin-friendly fabric, ensuring a safe and peaceful sleep for babies.",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Best Quality",
    hasSizes: false,
    images: [
            "/images/baby-net-mosquito.jpeg"
    ]
  },
  {
    id: 96,
    name: "Cetaphil Baby Protection Cream",   
    category: "Baby Care",
    description: "Cetaphil Baby Protection Cream: Gentle moisturizing cream that helps protect and nourish baby’s delicate skin, providing long-lasting hydration and protection from dryness.",
    originalPrice: 749,
    discountPrice: 675,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/cetaphil-baby-cream.jpeg"
    ]
  },
  {
    id: 97,
    name: "Cetaphil Baby Soap",   
    category:"Baby Care",
    description: "Cetaphil Baby Soap: Mild and gentle soap specially formulated for babies, helps cleanse without drying the skin, leaving it soft, smooth, and healthy.",
    originalPrice: 211.50,
    discountPrice: 199,
    badge: "Best Quality",
    hasSizes: false,
    images: [
            "/images/cetaphil-baby-soap.jpeg"
    ]
  },
  {
    id: 98,
    name: "Johnson's Baby Lotion",   
    category: "Baby Care",
    description: "Johnson's Baby Lotion: Light and moisturizing lotion that keeps baby’s skin soft, smooth, and hydrated, ideal for daily use.",
    originalPrice: 75,
    discountPrice: 60,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/johnson-baby-lotion.jpeg"
    ]
  },
  {
    id: 99,
    name: "Johnson's Baby Oil",   
    category: "Baby Care",
    description: "Johnson's Baby Oil: Gentle baby oil that helps lock in moisture and nourish the skin, perfect for massage and hydration.",
    originalPrice: 165,
    discountPrice: 150,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/johnson-baby-oil.jpeg"
    ]
  },
  {
    id: 100,
    name: "Johnson's Baby Shampoo",   
    category:"Baby Care",
    description: "Johnson's Baby Shampoo: Mild shampoo designed to clean baby’s hair gently without irritation, leaving it soft and fresh.",
    originalPrice: 135,
    discountPrice: 120,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/johnson-baby-shampoo.jpeg"
    ]
  },
  {
    id: 101,
    name: "Johnson's Baby Shampoo(Shiny drops)",   
    category: "Baby Care",
    description: "Johnson's Baby Shampoo (Shiny Drops): Special formula that gives soft, shiny, and smooth hair, while being gentle on baby’s scalp and eyes.",
    originalPrice: 160,
    discountPrice: 150,
    badge: "Baby Care",
    hasSizes: false,
    images: [
            "/images/johnson-baby-shampoo1.jpeg"
    ]
  },
  {
    id: 102,
    name: "Johnson's Baby Powder(100g)",   
    category: "Baby Care",
    description: "Johnson's Baby Powder (100g): Soft powder that helps absorb moisture and keep skin fresh and dry, reducing irritation and discomfort.",
    originalPrice: 130,
    discountPrice: 120,
    badge: "Best Seller",
    hasSizes: false,
    images: [
            "/images/johnson-baby-powder.jpeg"
    ]
  },
  {
    id: 103,
    name: "Cetaphil Baby Shampoo",   
    category: "Baby Care",
    description: "Cetaphil Baby Shampoo: Tear-free shampoo that gently cleanses baby’s hair and scalp, keeping it soft, healthy, and manageable.",
    originalPrice: 819,
    discountPrice: 750,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/cetaphil-baby-shampoo.jpeg"
    ]
  },
  {
    id: 104,
    name: "Himalaya Baby Powder",   
    category: "Baby Care",
    description: "Himalaya Baby Powder: Herbal baby powder made with natural ingredients, helps soothe skin, absorb moisture, and keep baby fresh.",
    originalPrice: 340,
    discountPrice: 319,
    badge: "upto 10% off",
    hasSizes: false,
    images: [
            "/images/himalaya-baby-powder.jpeg"
    ]
  },
  {
    id: 105,
    name: "Himalaya Baby Combo(Powder+Soap)",   
    category: "Baby Care",
    description: "Himalaya Baby Combo (Powder + Soap): Complete baby care combo with gentle soap and soothing powder, ensuring clean, soft, and healthy skin.",
    originalPrice: 210,
    discountPrice: 200,
    badge: "Offer",
    hasSizes: false,
    images: [
            "/images/himalaya-baby-combo.jpeg"
    ]
  },
  {
    id: 106,
    name: "Himalaya Baby Combo(Massage oil+Soap)",   
    category: "Baby Care",
    description: "Himalaya Baby Combo (Massage Oil + Soap): Nourishing combo including baby massage oil and soap, helps strengthen skin, improve moisture, and provide gentle cleansing.",
    originalPrice: 210,
    discountPrice: 200,
    badge: "Offer",
    hasSizes: false,
    images: [
            "/images/himalaya-baby-combo1.jpeg"
    ]
  },
  {
    id: 108,
    name: "Push Walker",
    category: "Baby Toys",
    description: "Push Walker:Age(1-2yrs) Designed for infants to encourage walking, with a sturdy frame and smooth wheels for safe exploration.",
    originalPrice: 3000,
    discountPrice: 1950,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/push-walker.jpeg"

    ]
  },
  {
    id: 109,
    name: "Baybee Push Walker",
    category: "Baby Toys",
    description: "Baybee Push Walker:Age(1-2yrs) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 3000,
    discountPrice: 1850,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baybee-push-walker.jpeg"

    ]
  },
  {
    id: 110,
    name: "Baybee Stepzilla Push Walker",
    category: "Baby Toys",
    description: "Baybee Stepzilla Push Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 3000,
    discountPrice: 1900,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/stepzilla.jpeg"

    ]
  },
  {
    id: 111,
    name: "Baby Adjustable Walker",
    category: "Baby Toys",
    description: "Baby Adjustable Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2300,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/adjustable-walker.jpeg"

    ]
  },
  {
    id: 112,
    name: "Hopper Baby Walker",
    category: "Baby Toys",
    description: "Hopper Baby Walker:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2400,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/hopper-walker.jpeg"

    ]
  },
  {
    id: 113,
    name: "ZATO Baby Walker",
    category: "Baby Toys",
    description: "ZATO Baby Walker:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2650,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/zato-walker.jpeg"

    ]
  },
  {
    id: 114,
    name: "Baby Walker",
    category: "Baby Toys",
    description: "Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2500,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker1.jpeg"

    ]
  },
  {
    id: 115,
    name: "Baby Walker",
    category: "Baby Toys",
    description: "Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2400,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker2.jpeg"

    ]
  },
  {
    id: 116,
    name: "Dino Baby Walker",
    category: "Baby Toys",
    description: "Dino Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2800,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/dinp-walker.jpeg"

    ]
  },
  {
    id: 117,
    name: "Clafy Baby Walker",
    category: "Baby Toys",
    description: "Clafy Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2900,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/clafy-walker.jpeg"

    ]
  },
  {
    id: 118,
    name: "Astro 2in1 Baby Walker",
    category: "Baby Toys",
    description: "Astro 2in1 Baby Walker:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 7000,
    discountPrice: 3200,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/astro-walker.jpeg"

    ]
  },
  {
    id: 119,
    name: "Baby Walker",
    category: "Baby Toys",
    description: "Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2300,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker3.jpeg"

    ]
  },
  {
    id: 120,
    name: "Baby Walker",
    category: "Baby Toys",
    description: "Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2250,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker4.jpeg"

    ]
  },
  {
    id: 121,
    name: "Baby  Walker",
    category: "Baby Toys",
    description: "Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 5000,
    discountPrice: 2400,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker5.jpeg"

    ]
  },
  {
    id: 122,
    name: "Bunny Baby Walker with Parental Handle",
    category: "Baby Toys",
    description: "Bunny Baby Walker with Parental Handle:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 6000,
    discountPrice: 2500,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/bunny-walker.jpeg"

    ]
  },
  {
    id: 123,
    name: "Minto Baby Walker with Parental Handle",
    category: "Baby Toys",
    description: "Minto Baby Walker with Parental Handle:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 6000,
    discountPrice: 2800,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/minto-walker.jpeg"

    ]
  },
  {
    id: 124,
    name: "Baby Walker with Parental Handle",
    category: "Baby Toys",
    description: "Baby Walker with Parental Handle:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 6000,
    discountPrice: 2800,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
                  "/images/baby-walker-handle.jpeg"

    ]
  },
  {
    id: 125,
    name: "QUACK 3in1 Baby Walker",
    category: "Baby Toys",
    description: "QUACK 3in1 Baby Walker:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 11000,
    discountPrice: 5500,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/quack-walker.jpeg"

    ]
  },
  {
    id: 126,
    name: "1st Step Baby Walker",
    category: "Baby Toys",
    description: "1st Step Baby Walker:Age(6-18 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 7000,
    discountPrice: 3600,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/1st-step.jpeg"

    ]
  },
  {
    id: 127,
    name: "GYPSY Baby Walker with Parental Handle",
    category: "Baby Toys",
    description: "GYPSY Baby Walker with Parental Handle:Age(6-24 months) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 7000,
    discountPrice: 3900,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/gypsy-walker.jpeg"

    ]
  },
  {
    id: 128,
    name: "Monstro ATV",
    category: "Baby Toys",
    description: "Monstro ATV: Battery:6V-4.5AHz, Charging Time: 10Hrs, Running Time: 40mins, Max Load: 30kg, Max Speed: 3-4km/h, Suitable Age: 2-7yrs. A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 11000,
    discountPrice: 5500,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/monstro-atv.jpeg"

    ]
  },
  {
    id: 129,
    name: "TRIXO Battery Scooter",
    category: "Baby Toys",
    description: "TRIXO Kids Battery Scooter:Battery-6V 7AH*1, Motor-6V(1x45W), Charger-6V 1000mA, Maximum Load-20kg, Applicable Age:1-5yrs, Max Speed-3-4Km/h.",
    originalPrice: 11000,
    discountPrice: 6700,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/trixo-scooty.jpeg"

    ]
  },
  {
    id: 130,
    name: "Kids Battery Scooter",
    category: "Baby Toys",
    description: "Kids Battery Scooter:Battery-6V 7AH*1, Motor-6V(2x45W), Charger-6V 1000mA, Maximum Load-20kg, Applicable Age:1-5yrs, Max Speed-3-4Km/h. A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 11000,
    discountPrice: 7000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/kids-scooter.jpeg"

    ]
  },
  {
    id: 131,
    name: "Kids Battery Bike",
    category: "Baby Toys",
    description: "Kids Battery Bike:Age(1-3 yrs) A safe and fun way for babies to explore their surroundings, with a sturdy frame and smooth wheels.",
    originalPrice: 20000,
    discountPrice: 11000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/kids-bike1.jpeg"

    ]
  },
   {
    id: 132,
    name: "ZIPPIO Battery Bike",
    category: "Baby Toys",
    description: "ZIPPIO Battery Bike: A playful, energetic, perfect for toddlers who love speed and adventure. With its vibrant design and sturdy build, this bike offers a safe and thrilling ride for little explorers, making every outing an exciting journey.",
    originalPrice: 20000,
    discountPrice: 12000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/zippio-bike.jpeg"

    ]
  },
   {
    id: 133,
    name: "MotoMunch Battery Bike",
    category: "Baby Toys",
    description: "MotoMunch Battery Bike:This bike makes for a perfect gift for kids ages 3+ years, with its realistic design and fun features. It is equipped with a powerful 6V motor that provides a smooth and enjoyable riding experience, allowing kids to explore their surroundings with confidence and excitement.",
    originalPrice: 20000,
    discountPrice: 16000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/motomunch.jpeg"

    ]
  },
 {
    id: 134,
    name: "Kids Battery Bike",
    category: "Baby Toys",
    description: "Kids Battery Bike:Battery-6V 4AH, Motor-2V(1x45W), Charger-6V 1000mA, Maximum Load-30kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 22000,
    discountPrice: 17000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/kids-bike2.jpeg"

    ]
  },
   {
    id: 135,
    name: "Speedy Battery Car",
    category: "Baby Toys",
    description: "Speedy Battery Car:Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(4x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-2-7yrs, Max Speed-3-4Km/h.",
    originalPrice: 11000,
    discountPrice: 5500,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/speedy-car.jpeg"

    ]
  },
   {
    id: 136,
    name: "Blaze Pro Battery Car",
    category: "Baby Toys",
    description: "Blaze Pro Battery Car:Battery-6V 7AH*1, Motor-6V(1x45W), Charger-6V 1000mA, Maximum Load-30kg, Applicable Age-1-4yrs, Max Speed-2-4Km/h.",
    originalPrice: 10000,
    discountPrice: 4900,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/blaze-pro-car.jpeg"

    ]
  },
   {
    id: 137,
    name: "Maestro Electric Go Kart",
    category: "Baby Toys",
    description: "Maestro Electric Go Kart:Battery-6V 4AH, Remote Control-2*AAA Battery(not Incl), Motor-6V(1x45W), Charger-6V 1000mA, Maximum Load-40kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 7300,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/maestro-kart.jpeg"

    ]
  },
   {
    id: 138,
    name: "Kids Battery Car",
    category: "Baby Toys",
    description: "Kids Battery Car:Battery-12V 4.5AH*1, Remote Control-2*AAA Battery(not Incl), Motor-12V(2x45W), Charger-12V 1000mA, Maximum Load-30kg, Applicable Age-3-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 20000,
    discountPrice: 9800,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
            "/images/kids-car.jpeg"

    ]
  },
   {
    id: 139,
    name: "Audi Battery Car",
    category: "Baby Toys",
    description: "Audi Battery Car:Battery-12V 4AH, Remote Control-2*AAA Battery(not Incl), Motor-12V(2x45W), Charger-12V 1000mA, Maximum Load-40kg, Applicable Age-2-6yrs, Max Speed-3-4Km/h.",
    originalPrice: 25000,
    discountPrice: 17000,
    badge: "Safe Toys",
    hasSizes: false,
    images: [
      "/images/audi-car.jpeg"
    ]
  },
   {
    id: 140,
    name: "Yekkada Oil",
    category: "Hygiene Products",
    description: "Yekkada Oil (Pain Relief Oil): Effective herbal oil designed to relieve muscle and joint pain, providing quick soothing relief and relaxation. 💆‍♂️✨",
    originalPrice: 80,
    discountPrice: 70,
    badge: "Pain Relief",
    hasSizes: false,
    images: [
      "/images/yekkada-oil.jpeg"
    ]
  },
   {
    id: 141,
    name: "Natural Face Whitening Cream",
    category: "Hygiene Products",
    description: "Natural Whitening Cream: Enriched with natural ingredients that help brighten skin tone, reduce dullness, and improve glow, suitable for daily skincare use. 🌿✨",
    originalPrice: 1500,
    discountPrice: 1000,
    badge: "100% Natural",
    hasSizes: false,
    images: [
      "/images/natural-face-cream1.jpeg","/images/natural-face-cream2.jpeg"
    ]
  },
  {
    id: 142,
    name: "Herbal Face Whitening Cream",
    category: "Hygiene Products",
    description: "Herbal Whitening Cream: Herbal-based formula that helps enhance skin brightness, nourish skin, and maintain a healthy glow with gentle care. 🌸✨",
    originalPrice: 2500,
    discountPrice: 2300,
    badge: "100% Natural",
    hasSizes: false,
    images: [
      "/images/herbal-face-cream2.jpeg"
    ]
  },
  {
    id: 143,
    name: "Bunny Ear Winter Cap",
    category: "Baby Accessories",
    description: "Bunny Winter Cap: Cute and cozy winter cap with a bunny design, made from soft, warm fabric to keep babies comfortable and protected in cold weather. 🐰❄️",
    originalPrice: 550,
    discountPrice: 350,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/bunny-cap.jpeg"
    ]
  },
  {
    id: 144,
    name: "Fluffy Winter Earmuffs",
    category: "Baby Accessories",
    description: "Fluffy Winter Earmuffs: Ultra-soft and warm winter earmuffs designed to protect from cold, providing maximum comfort and a snug fit for babies and kids. ❄️🧸",
    originalPrice: 300,
    discountPrice: 250,
    badge: "Best Seller",
    hasSizes: false,
    images: [
      "/images/fluffy-cap.jpeg"
    ]
  },
  {
    id: 145,
    name: "Manual Massage Breast Pump",
    category: "Hygiene Products",
    description: "Manual Massage Breast Pump: Easy-to-use manual breast pump with a gentle massage feature that helps smooth milk expression, ensuring comfort and convenience for mothers. 🤱✨",
    originalPrice: 1200,
    discountPrice: 550,
    badge: "Top Quality",
    hasSizes: false,
    images: [
      "/images/breast-pump.jpeg"
    ]
  },
  {
    id: 146,
    name: "Sadguru Gramflour Soap",
    category: "Hygiene Products",
    description: "Gram Flour Soap: Natural soap enriched with gram flour (besan) that helps cleanse, exfoliate, and brighten skin, leaving it soft, smooth, and refreshed. 🌿✨",
    originalPrice:200,
    discountPrice: 160,
    badge: " Pack of 6",
    hasSizes: false,
    images: [
      "/images/gram-soap1.jpeg"
    ]
  },
  {
    id: 147,
    name: "Sadguru Gramflour Soap",
    category: "Hygiene Products",
    description: "Gram Flour Soap: Natural soap enriched with gram flour (besan) that helps cleanse, exfoliate, and brighten skin, leaving it soft, smooth, and refreshed. 🌿✨",
    originalPrice: 150,
    discountPrice: 100,
    badge: "Buy 4 Get 1 Free",
    hasSizes: false,
    images: [
    "/images/gram-soap2.jpeg"
    ]
  },
  {
    id: 148,
    name: "Pampers Pant",
    category: "Baby Care",
    description: "Pampers Pants: Soft and highly absorbent diaper pants designed to provide long-lasting dryness and leak protection, ensuring comfort and a snug fit for babies during day and night. 👶✨",
    originalPrice: 699,
    discountPrice: 599,
    badge: "Best Seller",
    hasSizes: true,
    sizes: [
       { size: "S ", price: 599, stock: true },
      { size: "M ", price: 599, stock: true },
      { size: "L", price: 599, stock: true },
      { size: "XL", price: 599, stock: true },
       { size: "XXL", price: 599, stock: true },
    ],
    images: [
      "/images/pampers-599.jpeg"
    ]
  },
  {
    id: 149,
    name: "Pampers Pant",
    category: "Baby Care",
    description: "Pampers Pants: Soft and highly absorbent diaper pants designed to provide long-lasting dryness and leak protection, ensuring comfort and a snug fit for babies during day and night. 👶✨",
    originalPrice: 499,
    discountPrice: 399,
    badge: "New",
    hasSizes: true,
    sizes: [
       { size: "S ", price: 399, stock: true },
      { size: "M ", price: 399, stock: true },
      { size: "L", price: 399, stock: true },
      { size: "XL", price: 399, stock: true },
       { size: "XXL", price: 399, stock: true },
    ],
    images: [
      "/images/pampers-399.jpeg"
    ]
  },
  {
    id: 150,
    name: "Amber",
    category: "Baby Care",
    description: "Amber (Baby Perfume): Mild and gentle baby perfume with a pleasant, long-lasting fragrance, specially formulated to be safe and soothing for delicate baby skin. 👶🌸",
    originalPrice: 120,
    discountPrice: 80,
    badge: "Original",
    hasSizes: false,
    images: [
      "/images/amber.jpeg"
    ]
  },

];

// Features/USPs
const features = [
  { icon: Percent, title: "Below MRP Prices", description: "All products at wholesale rates" },
  { icon: Package, title: "Wide Selection", description: "500+ products under one roof" },
  { icon: Truck, title: "Free Delivery", description: "Free within 5 KM radius" },
  { icon: Shield, title: "Genuine Products", description: "100% authentic branded items" }
];

// Sample feedback/reviews
const initialReviews = [
  { id: 1, name: "Priya Sharma", rating: 5, comment: "Best prices in Karkala! Always shop here for baby products.", date: "Feb 2026" },
  { id: 2, name: "Mohammed Ali", rating: 5, comment: "Excellent service and genuine products. Highly recommended!", date: "Feb 2026" },
  { id: 3, name: "Lakshmi R", rating: 4, comment: "Good variety of products. Staff is very helpful.", date: "Jan 2026" },
];

// Product Detail Modal - Compact Design with Visible Add to Cart
const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (product && product.hasSizes && product.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(null);
    }
    setCurrentImageIndex(0);
    setAddedToCart(false);
    setQuantity(1);
  }, [product]);
  
  if (!isOpen || !product) return null;

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const currentPrice = selectedSize ? selectedSize.price : product.discountPrice;
  const savings = Math.round((1 - currentPrice / product.originalPrice) * 100);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    if (product.hasSizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" data-testid="product-modal-overlay">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          data-testid="modal-close"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-5 max-h-[85vh]">
          {/* Image Gallery Section - Compact */}
          <div className="relative bg-slate-50 md:col-span-2 flex flex-col flex-shrink-0">
            {/* Main Image */}
            <div className="relative h-[200px] md:h-[320px] flex items-center justify-center p-3">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                data-testid="modal-main-image"
              />
              
              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-110 border border-slate-200"
                    data-testid="prev-image"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-110 border border-slate-200"
                    data-testid="next-image"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {hasMultipleImages && (
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? "border-sky-500 ring-1 ring-sky-200 scale-105" 
                        : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
                    }`}
                    data-testid={`thumbnail-${idx}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:col-span-3 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-5 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-amber-100 text-amber-800 text-xs">{product.badge}</Badge>
                <span className="text-xs text-slate-400">{product.category}</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">{product.name}</h2>
              
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-sky-600">₹{currentPrice}</span>
                <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {savings}% OFF
                </span>
              </div>

              {/* Size Selection */}
              {product.hasSizes && product.sizes && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" /> Select Size
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => setSelectedSize(sizeOption)}
                        className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm ${
                          selectedSize?.size === sizeOption.size
                            ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                        data-testid={`size-${sizeOption.size}`}
                      >
                        <span className="block text-xs font-semibold">{sizeOption.size}</span>
                        <span className="block text-[11px] text-slate-500">₹{sizeOption.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4 flex items-center gap-3">
                <span className="font-medium text-slate-700 text-sm">Qty:</span>
                <div className="flex items-center gap-2 bg-slate-100 rounded-full px-1.5 py-0.5">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-50"
                    data-testid="qty-minus"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-50"
                    data-testid="qty-plus"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-slate-500 text-xs">Total: ₹{currentPrice * quantity}</span>
              </div>

              {/* Description - Collapsible */}
              <p className="text-slate-600 text-xs leading-relaxed mb-3">{product.description}</p>

              {/* Features - Inline */}
              <div className="flex flex-wrap gap-2 text-xs text-green-700">
                <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Genuine</span>
                <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Free Delivery 5KM</span>
                <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Below MRP</span>
                <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> COD</span>
              </div>
            </div>

            {/* Action Buttons - Always visible at bottom */}
            <div className="p-3 md:p-4 border-t bg-white flex gap-2 flex-shrink-0">
              <Button
                onClick={handleAddToCart}
                className={`flex-1 h-12 text-base font-semibold transition-all ${
                  addedToCart 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-sky-600 hover:bg-sky-700"
                } text-white`}
                data-testid="modal-add-to-cart"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-1.5" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-1.5" />
                    Add to Cart - ₹{currentPrice * quantity}
                  </>
                )}
              </Button>
              
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(`Hi! I'm interested in ${product.name}${selectedSize ? ` (Size: ${selectedSize.size})` : ''} - ₹${currentPrice}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="h-12 px-4 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" data-testid="modal-whatsapp-btn">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const { cartCount, setIsCartOpen } = useCart();
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-dark shadow-soft" : "bg-white/90 backdrop-blur-sm"}`} data-testid="main-navbar">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-2" data-testid="logo-link">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/30">
                <span className="w-full text-center">DC</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-slate-900">Discount Centre</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link text-sm" data-testid={`nav-${item.label.toLowerCase()}`}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-sky-600 transition-colors"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <a href={`tel:${storeInfo.phone}`} className="hidden md:flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(true)} data-testid="mobile-menu-button">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu-content">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-lg font-medium text-slate-700 hover:text-sky-600 py-2" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Cart Drawer Component
const CartDrawer = () => {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill all fields");
      return;
    }

    let orderMessage = `*🛒 NEW ORDER - Discount Centre*\n\n`;
    orderMessage += `*Customer Details:*\n`;
    orderMessage += `👤 Name: ${customerInfo.name}\n`;
    orderMessage += `📞 Phone: ${customerInfo.phone}\n`;
    orderMessage += `📍 Address: ${customerInfo.address}\n\n`;
    orderMessage += `*Order Items:*\n`;
    
    cartItems.forEach((item, index) => {
      const sizeText = item.selectedSize ? ` (${item.selectedSize})` : '';
      orderMessage += `${index + 1}. ${item.name}${sizeText}\n`;
      orderMessage += `   Qty: ${item.quantity} x ₹${item.discountPrice} = ₹${item.quantity * item.discountPrice}\n`;
    });
    
    orderMessage += `\n*💰 Total Amount: ₹${cartTotal}*\n`;
    orderMessage += `*💵 Payment: Cash on Delivery*\n\n`;
    orderMessage += `🚚 *Delivery Info:*\n`;
    orderMessage += `• FREE delivery within 5 KM\n`;
    orderMessage += `• Charges apply for 5+ KM distance\n\n`;
    orderMessage += `Thank you for your order! 🙏`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setIsCheckout(false);
    setIsCartOpen(false);
    setCustomerInfo({ name: "", phone: "", address: "" });
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{isCheckout ? "Checkout" : "Your Cart"}</h2>
          <button onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} className="p-2 text-slate-500 hover:text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isCheckout ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">Your cart is empty</p>
                  <Button onClick={() => setIsCartOpen(false)} className="mt-4 btn-primary">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.cartItemId} className="flex gap-3 p-3 bg-slate-50 rounded-xl" data-testid={`cart-item-${item.cartItemId}`}>
                      <img src={item.images?.[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        {item.selectedSize && (
                          <p className="text-xs text-slate-500">Size: {item.selectedSize}</p>
                        )}
                        <p className="text-sky-600 font-bold">₹{item.discountPrice}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="ml-auto text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-sky-600">₹{cartTotal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <Truck className="w-4 h-4" />
                  <span>Cash on Delivery Available</span>
                </div>
                <Button onClick={() => setIsCheckout(true)} className="w-full btn-primary" data-testid="proceed-checkout">
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-amber-700">Pay when you receive your order</p>
                </div>

                {/* Delivery Info Message */}
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🚚</div>
                    <div>
                      <p className="font-semibold text-sky-800">Delivery Information</p>
                      <p className="text-sm text-sky-700 mt-1">
                        Delivery is <strong>FREE</strong> within 5 KM.
                      </p>
                      <p className="text-sm text-sky-700 mt-1">
                        For distances above 5 KM, delivery charges will be added.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                    data-testid="checkout-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    data-testid="checkout-phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <Textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="Enter your complete address"
                    rows={3}
                    data-testid="checkout-address"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Order Summary</h4>
                  {cartItems.map(item => (
                    <div key={item.cartItemId} className="flex justify-between text-sm py-1">
                      <span className="truncate flex-1">
                        {item.name}
                        {item.selectedSize && <span className="text-slate-400"> ({item.selectedSize})</span>}
                        {" "}x{item.quantity}
                      </span>
                      <span className="font-medium ml-2">₹{item.discountPrice * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-sky-600">₹{cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 space-y-3">
              <Button onClick={handlePlaceOrder} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-12" data-testid="place-order-btn">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Place Order via WhatsApp
              </Button>
              <button onClick={() => setIsCheckout(false)} className="w-full text-slate-600 text-sm py-2">
                ← Back to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => (
  <section id="home" className="pt-20 md:pt-24 pb-16 bg-hero-gradient relative overflow-hidden">
    <div className="blob-1 -top-48 -left-48 opacity-50" />
    <div className="blob-2 top-20 right-0 opacity-50" />
    
    <div className="container-custom relative z-10">
      <div className="hero-bento">
        <div className="hero-main animate-fade-in-up" data-testid="hero-main">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Percent className="w-3 h-3 mr-1" /> Below MRP Prices
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
            More Value.<br />
            <span className="gradient-text">Better Deals.</span><br />
            Every Day.
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg">
            {storeInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products">
              <Button className="btn-primary w-full sm:w-auto" data-testid="hero-explore-deals">
                Shop Now <ShoppingCart className="w-4 h-4 ml-1" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" className="btn-secondary w-full sm:w-auto" data-testid="hero-visit-store">
                Visit Our Store
              </Button>
            </a>
          </div>
        </div>

        <div className="hero-side hero-side-top animate-fade-in-up animation-delay-200" data-testid="hero-stats">
          <div className="stat-number">150+</div>
          <p className="text-slate-700 font-medium mt-2">Products Listed</p>
          <div className="flex items-center gap-1 mt-2 text-amber-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
        </div>

        <div className="hero-side hero-side-bottom animate-fade-in-up animation-delay-300" data-testid="hero-products">
          <div className="stat-number">65%</div>
          <p className="text-slate-700 font-medium mt-2">Savings Upto</p>
          <p className="text-sm text-slate-500 mt-1">Cash on Delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {features.map((feature, index) => (
          <div key={feature.title} className="bg-white rounded-2xl p-4 md:p-6 shadow-soft card-hover animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
            <div className="feature-icon mb-3"><feature.icon className="w-5 h-5" /></div>
            <h3 className="font-semibold text-slate-900 text-sm md:text-base">{feature.title}</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Products Section
const ProductsSection = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const categoryList = ["All", ...new Set(allProducts.map(p => p.category))];

  return (
    <section id="products" className="py-16 md:py-24 bg-subtle-gradient">
      <div className="container-custom">
        <div className="text-center mb-8 animate-fade-in-up" data-testid="products-header">
          <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">Shop Now</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Products</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Click on any product to view gallery, select size, and add to cart!</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30" 
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
              data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => {
            const mainImage = product.images?.[0];
            const imageCount = product.images?.length || 0;
            
            return (
              <div
                key={product.id}
                className="product-card animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedProduct(product)}
                data-testid={`product-card-${product.id}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="badge-deal text-xs">{product.badge}</span>
                  {product.hasSizes && (
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Multiple Sizes</span>
                  )}
                </div>
                
                <div className="product-img mb-3 group-hover:scale-[1.02] transition-transform relative overflow-hidden rounded-lg">
                  <img src={mainImage} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Multiple images badge */}
                  {imageCount > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {imageCount} photos
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-sky-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-sky-600">
                    {product.hasSizes ? `From ₹${Math.min(...product.sizes.map(s => s.price))}` : `₹${product.discountPrice}`}
                  </span>
                  <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.hasSizes) {
                      setSelectedProduct(product);
                    } else {
                      addToCart(product, null);
                    }
                  }}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm h-9"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  {product.hasSizes ? (
                    <>Select Size</>
                  ) : (
                    <><Plus className="w-4 h-4 mr-1" /> Add to Cart</>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

// About Section
const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 bg-white">
    <div className="container-custom">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative animate-fade-in-up">
          <div className="aspect-square rounded-3xl overflow-hidden img-zoom">
            <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop" alt="Discount Centre Store" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-4 md:p-6 shadow-xl">
            <p className="text-sm text-slate-500">Serving Karkala since</p>
            <p className="text-2xl md:text-3xl font-bold text-sky-600">2015</p>
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-200">
          <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">About Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Trusted Partner for<br /><span className="gradient-text">Everyday Savings</span>
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            <strong>Discount Centre</strong> ({storeInfo.nameKannada}) has been Karkala's favorite destination for quality household products at unbeatable prices.
          </p>
          <p className="text-slate-600 mb-8 leading-relaxed">
            From baby care essentials to hygiene products - we stock everything your family needs, all at wholesale prices available for retail customers too.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div><p className="text-3xl font-bold text-sky-600">20+</p><p className="text-slate-600 text-sm">Products Online</p></div>
            <div><p className="text-3xl font-bold text-sky-600">100%</p><p className="text-slate-600 text-sm">Genuine Products</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Feedback Section
const FeedbackSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    setReviews([{ id: Date.now(), ...newReview, date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="feedback" className="py-16 md:py-24 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">Customer Reviews</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-sky-600" /> Write a Review
            </h3>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600 fill-current" />
                </div>
                <p className="text-green-600 font-medium">Thank you for your feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} placeholder="Enter your name" data-testid="feedback-name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} className="focus:outline-none">
                        <Star className={`w-8 h-8 transition-colors ${star <= newReview.rating ? "text-amber-400 fill-current" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <Textarea value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} placeholder="Share your experience..." rows={4} data-testid="feedback-comment" />
                </div>
                <Button type="submit" className="w-full btn-primary" data-testid="submit-feedback">
                  <Send className="w-4 h-4 mr-2" /> Submit Review
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-200">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-soft">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-current" : "text-slate-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 bg-white">
    <div className="container-custom">
      <div className="text-center mb-12 animate-fade-in-up">
        <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">Visit Us</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Come Say Hello</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="animate-fade-in-up">
          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 h-full">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="contact-item">
                <div className="contact-icon"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="font-medium text-slate-900">Store Address</p>
                  <p className="text-slate-600 text-sm mt-1">{storeInfo.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Phone className="w-5 h-5" /></div>
                <div>
                  <p className="font-medium text-slate-900">Phone / WhatsApp</p>
                  <a href={`tel:${storeInfo.phone}`} className="text-sky-600 text-sm mt-1 hover:underline">{storeInfo.phone}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Mail className="w-5 h-5" /></div>
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <a href={`mailto:${storeInfo.email}`} className="text-sky-600 text-sm mt-1 hover:underline break-all">{storeInfo.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Clock className="w-5 h-5" /></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-3">Store Hours</p>
                  <table className="hours-table text-sm">
                    <tbody>
                      {storeInfo.hours.map((item) => (
                        <tr key={item.day}><td>{item.day}</td><td>{item.time}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Chat on WhatsApp
                </Button>
              </a>
              <a href="https://maps.google.com/?q=Banglegudde+Junction+Karkala+Karnataka" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full btn-secondary"><MapPin className="w-4 h-4 mr-2" />Get Directions</Button>
              </a>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-200">
          <div className="map-container h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.679847123456!2d74.9876543!3d13.2123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca87a0d0c9a0f%3A0x0!2sBanglegudde%2C%20Karkala!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Discount Centre Location"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-slate-900 text-white py-12 md:py-16">
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold text-lg">DC</div>
            <span className="font-bold text-lg">Discount Centre</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">Your family's hygiene & care partner. Quality products at wholesale prices.</p>
          <p className="text-slate-500 text-xs">GSTIN: {storeInfo.gstin}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <a href="#home" className="footer-link text-sm block">Home</a>
            <a href="#products" className="footer-link text-sm block">Products</a>
            <a href="#about" className="footer-link text-sm block">About Us</a>
            <a href="#contact" className="footer-link text-sm block">Contact</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <div className="space-y-2">
            {categories.map(cat => <span key={cat.id} className="text-slate-400 text-sm block">{cat.name}</span>)}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-2">
            <a href={`tel:${storeInfo.phone}`} className="footer-link text-sm flex items-center gap-2"><Phone className="w-4 h-4" />{storeInfo.phone}</a>
            <a href={`mailto:${storeInfo.email}`} className="footer-link text-sm flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /><span className="truncate">{storeInfo.email}</span></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm text-center md:text-left">© {new Date().getFullYear()} Discount Centre. All rights reserved.</p>
        <p className="text-slate-500 text-sm">Karkala, Karnataka, India</p>
      </div>
    </div>
  </footer>
);

// WhatsApp Floating Button
const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-btn animate-bounce-slow"
    aria-label="Chat on WhatsApp"
    data-testid="whatsapp-float-button"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>
);
const InstagramButton = () => (
  <a
    href="https://www.instagram.com/discount_centre_karkala"
    target="_blank"
    rel="noopener noreferrer"
    className="instagram-btn animate-bounce-slow"
    aria-label="Visit Instagram"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.22 4 20 5.78 20 7.75v8.5c0 1.97-1.78 3.75-3.75 3.75h-8.5C5.78 20 4 18.22 4 16.25v-8.5C4 5.78 5.78 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
    </svg>
  </a>
);
// Main App
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <CartDrawer />
        <main>
          <HeroSection />
          <ProductsSection />
          <AboutSection />
          <FeedbackSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
        <InstagramButton />
      </div>
    </CartProvider>
  );
}

export default App;
