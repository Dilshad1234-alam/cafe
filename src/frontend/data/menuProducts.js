export const menuProducts = [
  // ----------------- BURGERS -----------------
  {
    id: "prod_1",
    slug: "classic-veg-burger",
    name: "Classic Veg Burger",
    shortDescription: "Crispy veg patty with fresh lettuce and signature sauce.",
    description: "Our signature crispy vegetable patty topped with fresh iceberg lettuce, juicy tomatoes, sliced onions, and our secret house sauce, served in a toasted sesame bun.",
    category: "burgers",
    categoryName: "Burgers",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80"],
    originalPrice: 120,
    salePrice: 99,
    rating: 4.8,
    reviewCount: 124,
    preparationTime: "10-15 min",
    ingredients: ["Veg Patty", "Lettuce", "Tomato", "Onion", "House Sauce", "Sesame Bun"],
    sizes: [],
    addOns: [
      { id: "add_cheese", name: "Extra Cheese", price: 20 },
      { id: "add_patty", name: "Double Patty", price: 40 },
      { id: "add_jalapeno", name: "Jalapenos", price: 15 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["bestseller", "classic", "snack"]
  },
  {
    id: "prod_2",
    slug: "paneer-loaded-burger",
    name: "Paneer Loaded Burger",
    shortDescription: "Spicy paneer patty with extra cheese and tandoori mayo.",
    description: "A thick, spicy paneer patty layered with melted cheese slice, jalapenos, and our special tandoori mayo in a premium bun.",
    category: "burgers",
    categoryName: "Burgers",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80"],
    originalPrice: 160,
    salePrice: 139,
    rating: 4.8,
    reviewCount: 112,
    preparationTime: "15 min",
    ingredients: ["Paneer Patty", "Cheese Slice", "Jalapenos", "Tandoori Mayo"],
    sizes: [],
    addOns: [
      { id: "add_cheese", name: "Extra Cheese", price: 20 },
      { id: "add_fries", name: "Small Fries on side", price: 50 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["spicy", "paneer"]
  },
  {
    id: "prod_3",
    slug: "crispy-cheese-burger",
    name: "Crispy Cheese Burger",
    shortDescription: "Crunchy veg patty oozing with liquid cheese.",
    description: "A delight for cheese lovers. Crispy outer layer with a molten liquid cheese core, topped with crisp veggies.",
    category: "burgers",
    categoryName: "Burgers",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1594212214618-2e06c7e2b7a9?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1594212214618-2e06c7e2b7a9?auto=format&fit=crop&q=80"],
    originalPrice: 140,
    salePrice: null,
    rating: 4.6,
    reviewCount: 85,
    preparationTime: "15 min",
    ingredients: ["Cheese Patty", "Lettuce", "Tomato", "Mayo"],
    sizes: [],
    addOns: [
      { id: "add_jalapeno", name: "Jalapenos", price: 15 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["cheese"]
  },

  // ----------------- PIZZA -----------------
  {
    id: "prod_4",
    slug: "cheese-burst-pizza",
    name: "Cheese Burst Pizza",
    shortDescription: "Loaded with mozzarella cheese, capsicum, onions, and corn with a cheese burst crust.",
    description: "Our famous pizza with a crust entirely filled with liquid cheese. Topped generously with fresh capsicum, onions, golden corn, and premium mozzarella.",
    category: "pizza",
    categoryName: "Pizza",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80"],
    originalPrice: 350,
    salePrice: 299,
    rating: 4.9,
    reviewCount: 205,
    preparationTime: "20-25 min",
    ingredients: ["Pizza Dough", "Liquid Cheese", "Mozzarella", "Capsicum", "Onion", "Corn"],
    sizes: [
      { id: "size_reg", name: "Regular (7\")", price: 299 },
      { id: "size_med", name: "Medium (10\")", price: 499 },
      { id: "size_lrg", name: "Large (12\")", price: 699 }
    ],
    addOns: [
      { id: "add_extra_cheese", name: "Extra Mozzarella", price: 50 },
      { id: "add_paneer", name: "Paneer Topping", price: 60 },
      { id: "add_olives", name: "Black Olives", price: 40 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["bestseller", "cheese", "heavy"]
  },
  {
    id: "prod_5",
    slug: "margherita-pizza",
    name: "Margherita Pizza",
    shortDescription: "Classic cheese pizza with rich tomato sauce.",
    description: "A timeless classic. Freshly baked dough topped with our signature tangy tomato sauce, fresh basil, and 100% real mozzarella cheese.",
    category: "pizza",
    categoryName: "Pizza",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80"],
    originalPrice: 200,
    salePrice: null,
    rating: 4.5,
    reviewCount: 150,
    preparationTime: "20 min",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Basil"],
    sizes: [
      { id: "size_reg", name: "Regular (7\")", price: 200 },
      { id: "size_med", name: "Medium (10\")", price: 350 },
      { id: "size_lrg", name: "Large (12\")", price: 500 }
    ],
    addOns: [
      { id: "add_extra_cheese", name: "Extra Mozzarella", price: 50 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["classic", "kids-friendly"]
  },
  {
    id: "prod_6",
    slug: "paneer-tikka-pizza",
    name: "Paneer Tikka Pizza",
    shortDescription: "Spicy tandoori paneer with red paprika and onions.",
    description: "An Indian twist to the Italian classic. Topped with spicy paneer tikka chunks, red paprika, crunchy onions, and a drizzle of mint mayo.",
    category: "pizza",
    categoryName: "Pizza",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80"],
    originalPrice: 280,
    salePrice: 250,
    rating: 4.7,
    reviewCount: 92,
    preparationTime: "20-25 min",
    ingredients: ["Pizza Dough", "Paneer Tikka", "Mozzarella", "Onion", "Red Paprika"],
    sizes: [
      { id: "size_reg", name: "Regular (7\")", price: 250 },
      { id: "size_med", name: "Medium (10\")", price: 420 },
      { id: "size_lrg", name: "Large (12\")", price: 590 }
    ],
    addOns: [
      { id: "add_extra_cheese", name: "Extra Mozzarella", price: 50 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["spicy", "paneer"]
  },

  // ----------------- MOMOS -----------------
  {
    id: "prod_7",
    slug: "veg-steamed-momos",
    name: "Veg Steamed Momos",
    shortDescription: "Classic steamed momos filled with finely chopped veggies.",
    description: "Soft and delicate steamed dumplings stuffed with a seasoned mix of cabbage, carrots, and onions. Served with our fiery red chili garlic sauce.",
    category: "momos",
    categoryName: "Momos",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80", // using momo image
    images: ["https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80"],
    originalPrice: 100,
    salePrice: 80,
    rating: 4.4,
    reviewCount: 110,
    preparationTime: "10 min",
    ingredients: ["Refined Flour", "Cabbage", "Carrot", "Onion", "Spices"],
    sizes: [
      { id: "size_half", name: "Half (5 pcs)", price: 80 },
      { id: "size_full", name: "Full (10 pcs)", price: 140 }
    ],
    addOns: [
      { id: "add_mayo", name: "Extra Mayo", price: 10 },
      { id: "add_chutney", name: "Extra Spicy Chutney", price: 10 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["healthy", "snack"]
  },
  {
    id: "prod_8",
    slug: "veg-kurkure-momos",
    name: "Veg Kurkure Momos",
    shortDescription: "Crunchy fried momos tossed in secret spices.",
    description: "Our bestselling momos coated in a crispy cornflake batter and deep-fried to golden perfection. Tossed in a tangy spice mix and served with mayo and spicy chutney.",
    category: "momos",
    categoryName: "Momos",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1597289124948-688c1a35cb48?auto=format&fit=crop&q=80", 
    images: ["https://images.unsplash.com/photo-1597289124948-688c1a35cb48?auto=format&fit=crop&q=80"],
    originalPrice: 150,
    salePrice: 130,
    rating: 4.7,
    reviewCount: 98,
    preparationTime: "15 min",
    ingredients: ["Veg Momos", "Cornflake Batter", "Secret Spices"],
    sizes: [
      { id: "size_half", name: "Half (5 pcs)", price: 130 },
      { id: "size_full", name: "Full (10 pcs)", price: 230 }
    ],
    addOns: [
      { id: "add_mayo", name: "Extra Mayo", price: 10 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["bestseller", "crunchy", "spicy"]
  },
  {
    id: "prod_9",
    slug: "veg-fried-momos",
    name: "Veg Fried Momos",
    shortDescription: "Classic momos deep-fried for a crunchy exterior.",
    description: "Our signature veg momos deep-fried until crisp. A perfect pairing with your evening coffee.",
    category: "momos",
    categoryName: "Momos",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80"],
    originalPrice: 120,
    salePrice: null,
    rating: 4.5,
    reviewCount: 65,
    preparationTime: "12 min",
    ingredients: ["Veg Momos", "Frying Oil"],
    sizes: [
      { id: "size_half", name: "Half (5 pcs)", price: 120 },
      { id: "size_full", name: "Full (10 pcs)", price: 200 }
    ],
    addOns: [],
    isPopular: false,
    isAvailable: true,
    tags: ["fried"]
  },

  // ----------------- FRIES -----------------
  {
    id: "prod_10",
    slug: "classic-salted-fries",
    name: "Classic Salted Fries",
    shortDescription: "Crispy golden potato fries salted to perfection.",
    description: "The classic side dish. Premium cut potatoes fried to a golden crisp and perfectly salted.",
    category: "french-fries",
    categoryName: "Fries",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80"],
    originalPrice: 90,
    salePrice: null,
    rating: 4.3,
    reviewCount: 220,
    preparationTime: "8 min",
    ingredients: ["Potatoes", "Salt", "Oil"],
    sizes: [
      { id: "size_reg", name: "Regular", price: 90 },
      { id: "size_lrg", name: "Large", price: 140 }
    ],
    addOns: [
      { id: "add_cheese_dip", name: "Cheese Dip", price: 25 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["classic", "sides"]
  },
  {
    id: "prod_11",
    slug: "peri-peri-fries",
    name: "Peri Peri Fries",
    shortDescription: "Crispy french fries tossed in spicy peri peri seasoning.",
    description: "Add some heat to your meal! Our classic crisp fries generously tossed in our zesty, spicy, and tangy peri peri spice mix.",
    category: "french-fries",
    categoryName: "Fries",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80"],
    originalPrice: 100,
    salePrice: 89,
    rating: 4.6,
    reviewCount: 145,
    preparationTime: "10 min",
    ingredients: ["Potatoes", "Peri Peri Seasoning", "Oil"],
    sizes: [
      { id: "size_reg", name: "Regular", price: 89 },
      { id: "size_lrg", name: "Large", price: 149 }
    ],
    addOns: [
      { id: "add_cheese_dip", name: "Cheese Dip", price: 25 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["spicy", "sides"]
  },
  {
    id: "prod_12",
    slug: "cheese-loaded-fries",
    name: "Cheese Loaded Fries",
    shortDescription: "Fries smothered in liquid cheese and jalapenos.",
    description: "The ultimate indulgence. Crispy fries layered with hot liquid cheddar cheese, topped with chopped onions and jalapenos.",
    category: "french-fries",
    categoryName: "Fries",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80"],
    originalPrice: 150,
    salePrice: 130,
    rating: 4.8,
    reviewCount: 89,
    preparationTime: "12 min",
    ingredients: ["Potatoes", "Liquid Cheese", "Jalapenos", "Onions"],
    sizes: [
      { id: "size_reg", name: "Regular", price: 130 }
    ],
    addOns: [],
    isPopular: false,
    isAvailable: true,
    tags: ["cheese", "loaded"]
  },

  // ----------------- DRINKS -----------------
  {
    id: "prod_13",
    slug: "cold-coffee",
    name: "Classic Cold Coffee",
    shortDescription: "Thick, creamy and refreshing cold coffee blended to perfection.",
    description: "Our signature blend of premium coffee, cold milk, and vanilla ice cream, whipped together for a thick, frothy, and refreshing treat.",
    category: "cold-coffee",
    categoryName: "Cold Coffee",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80"],
    originalPrice: 90,
    salePrice: null,
    rating: 4.8,
    reviewCount: 210,
    preparationTime: "5 min",
    ingredients: ["Coffee", "Milk", "Vanilla Ice Cream", "Sugar"],
    sizes: [
      { id: "size_reg", name: "Regular (300ml)", price: 90 },
      { id: "size_lrg", name: "Large (500ml)", price: 130 }
    ],
    addOns: [
      { id: "add_ice_cream", name: "Extra Vanilla Scoop", price: 30 },
      { id: "add_choco_chips", name: "Choco Chips", price: 15 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["bestseller", "refreshing", "coffee"]
  },
  {
    id: "prod_14",
    slug: "chocolate-shake",
    name: "Rich Chocolate Shake",
    shortDescription: "Decadent chocolate shake topped with whipped cream and choco chips.",
    description: "For the chocolate lovers. A rich, thick blend of chocolate ice cream, chocolate syrup, and cold milk, finished with choco chips.",
    category: "shakes",
    categoryName: "Shakes",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80"],
    originalPrice: 140,
    salePrice: 120,
    rating: 4.7,
    reviewCount: 88,
    preparationTime: "10 min",
    ingredients: ["Chocolate Ice Cream", "Milk", "Chocolate Syrup", "Choco Chips"],
    sizes: [
      { id: "size_reg", name: "Regular (300ml)", price: 120 },
      { id: "size_lrg", name: "Large (500ml)", price: 160 }
    ],
    addOns: [
      { id: "add_ice_cream", name: "Extra Choco Scoop", price: 30 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["sweet", "chocolate"]
  },
  {
    id: "prod_15",
    slug: "oreo-shake",
    name: "Oreo Crunch Shake",
    shortDescription: "Thick vanilla shake blended with crunchy Oreo cookies.",
    description: "A fan favorite. We blend crunchy Oreo cookies into our thick vanilla shake and top it with crushed Oreos and chocolate drizzle.",
    category: "shakes",
    categoryName: "Shakes",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1579954115567-d724f815ba6b?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1579954115567-d724f815ba6b?auto=format&fit=crop&q=80"],
    originalPrice: 150,
    salePrice: null,
    rating: 4.9,
    reviewCount: 140,
    preparationTime: "10 min",
    ingredients: ["Oreo Cookies", "Vanilla Ice Cream", "Milk", "Chocolate Drizzle"],
    sizes: [
      { id: "size_reg", name: "Regular (300ml)", price: 150 },
      { id: "size_lrg", name: "Large (500ml)", price: 190 }
    ],
    addOns: [],
    isPopular: false,
    isAvailable: true,
    tags: ["sweet", "oreo"]
  },
  {
    id: "prod_16",
    slug: "blue-lagoon-mocktail",
    name: "Blue Lagoon Mocktail",
    shortDescription: "Refreshing citrus and blue curacao mocktail.",
    description: "A vibrant, refreshing, and fizzy mocktail made with blue curacao syrup, fresh lemon juice, mint, and sprite. Perfect to beat the heat.",
    category: "mocktails",
    categoryName: "Mocktails",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80"],
    originalPrice: 110,
    salePrice: 99,
    rating: 4.6,
    reviewCount: 45,
    preparationTime: "5 min",
    ingredients: ["Blue Curacao", "Lemon Juice", "Mint", "Sprite", "Ice"],
    sizes: [
      { id: "size_reg", name: "Regular (300ml)", price: 99 }
    ],
    addOns: [],
    isPopular: false,
    isAvailable: true,
    tags: ["refreshing", "cold"]
  },

  // ----------------- COMBOS -----------------
  {
    id: "prod_17",
    slug: "burger-coffee-combo",
    name: "Burger & Coffee Combo",
    shortDescription: "Classic Veg Burger + Classic Cold Coffee.",
    description: "The ultimate pairing. Get our bestselling Classic Veg Burger along with a refreshing Classic Cold Coffee at a special discounted price.",
    category: "combos",
    categoryName: "Combos",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80"],
    originalPrice: 210,
    salePrice: 159,
    rating: 4.9,
    reviewCount: 167,
    preparationTime: "15 min",
    ingredients: ["Classic Veg Burger", "Classic Cold Coffee"],
    sizes: [],
    addOns: [
      { id: "add_fries", name: "Add Small Fries", price: 50 }
    ],
    isPopular: true,
    isAvailable: true,
    tags: ["bestseller", "combo", "value"]
  },
  {
    id: "prod_18",
    slug: "pizza-fries-combo",
    name: "Pizza & Fries Combo",
    shortDescription: "Regular Margherita Pizza + Peri Peri Fries.",
    description: "A match made in heaven. Enjoy a freshly baked Regular Margherita Pizza alongside a spicy portion of our Peri Peri Fries.",
    category: "combos",
    categoryName: "Combos",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80"],
    originalPrice: 300,
    salePrice: 249,
    rating: 4.7,
    reviewCount: 115,
    preparationTime: "25 min",
    ingredients: ["Margherita Pizza (7\")", "Peri Peri Fries"],
    sizes: [],
    addOns: [
      { id: "add_coke", name: "Add 250ml Coke", price: 30 }
    ],
    isPopular: false,
    isAvailable: true,
    tags: ["combo", "value"]
  }
];
