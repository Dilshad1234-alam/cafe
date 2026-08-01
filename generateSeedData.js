const fs = require('fs');

const categories = [
  { name: 'Burger', slug: 'burger', description: 'Juicy, handcrafted burgers.', image: '/images/categories/burger.jpg', sortOrder: 1, isActive: true },
  { name: 'Pizza', slug: 'pizza', description: 'Wood-fired oven pizzas.', image: '/images/categories/pizza.jpg', sortOrder: 2, isActive: true },
  { name: 'Momos', slug: 'momos', description: 'Authentic steamed and fried momos.', image: '/images/categories/momos.jpg', sortOrder: 3, isActive: true },
  { name: 'Sandwich', slug: 'sandwich', description: 'Grilled and fresh sandwiches.', image: '/images/categories/sandwich.jpg', sortOrder: 4, isActive: true },
  { name: 'French Fries', slug: 'french-fries', description: 'Crispy and loaded fries.', image: '/images/categories/french-fries.jpg', sortOrder: 5, isActive: true },
  { name: 'Pasta', slug: 'pasta', description: 'Rich and creamy Italian pastas.', image: '/images/categories/pasta.jpg', sortOrder: 6, isActive: true },
  { name: 'Maggi', slug: 'maggi', description: 'Everyone\'s favorite noodles.', image: '/images/categories/maggi.jpg', sortOrder: 7, isActive: true },
  { name: 'Wraps', slug: 'wraps', description: 'Flavorful wraps and rolls.', image: '/images/categories/wraps.jpg', sortOrder: 8, isActive: true },
  { name: 'Coffee', slug: 'coffee', description: 'Hot and cold brewed coffees.', image: '/images/categories/coffee.jpg', sortOrder: 9, isActive: true },
  { name: 'Shakes', slug: 'shakes', description: 'Thick and creamy milkshakes.', image: '/images/categories/shakes.jpg', sortOrder: 10, isActive: true },
  { name: 'Mocktails', slug: 'mocktails', description: 'Refreshing fruit mocktails.', image: '/images/categories/mocktails.jpg', sortOrder: 11, isActive: true },
  { name: 'Soft Drinks', slug: 'soft-drinks', description: 'Chilled beverages.', image: '/images/categories/soft-drinks.jpg', sortOrder: 12, isActive: true },
  { name: 'Desserts', slug: 'desserts', description: 'Sweet treats to end your meal.', image: '/images/categories/desserts.jpg', sortOrder: 13, isActive: true },
  { name: 'Combos', slug: 'combos', description: 'Value meals and combos.', image: '/images/categories/combos.jpg', sortOrder: 14, isActive: true }
];

fs.writeFileSync('seed-data/categories.json', JSON.stringify(categories, null, 2));

const products = [];

// Helper to add products
function addProducts(catSlug, items) {
  items.forEach((item, index) => {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    products.push({
      name: item.name,
      slug: slug,
      shortDescription: item.shortDescription || `Delicious ${item.name} prepared fresh.`,
      description: item.description || `Enjoy our freshly made ${item.name} with premium ingredients. Served hot and fresh.`,
      category: catSlug,
      foodType: item.foodType || "veg",
      image: `/images/products/${slug}.jpg`,
      basePrice: item.basePrice,
      salePrice: item.salePrice || 0,
      sizes: item.sizes || [],
      addOns: item.addOns || [],
      ingredients: item.ingredients || [],
      tags: item.tags || [catSlug, 'popular'],
      stock: 100,
      preparationTime: item.preparationTime || 15,
      featured: item.featured || false,
      available: true
    });
  });
}

// Burger (10 items)
addProducts('burger', [
  { name: 'Aloo Tikki Burger', basePrice: 69, foodType: 'veg', featured: true },
  { name: 'Veggie Delite Burger', basePrice: 89, foodType: 'veg' },
  { name: 'Cheese Burger', basePrice: 99, foodType: 'veg' },
  { name: 'Paneer Makhani Burger', basePrice: 129, foodType: 'veg' },
  { name: 'Spicy Paneer Burger', basePrice: 139, foodType: 'veg' },
  { name: 'Mushroom Swiss Burger', basePrice: 149, foodType: 'veg' },
  { name: 'Chicken Burger', basePrice: 119, foodType: 'non-veg' },
  { name: 'Crispy Chicken Burger', basePrice: 149, foodType: 'non-veg', featured: true },
  { name: 'BBQ Chicken Burger', basePrice: 159, foodType: 'non-veg' },
  { name: 'Double Decker Burger', basePrice: 199, foodType: 'non-veg' }
]);

// Pizza (10 items)
addProducts('pizza', [
  { name: 'Margherita Pizza', basePrice: 199, foodType: 'veg', featured: true },
  { name: 'Farmhouse Pizza', basePrice: 249, foodType: 'veg' },
  { name: 'Veg Supreme Pizza', basePrice: 279, foodType: 'veg' },
  { name: 'Paneer Tikka Pizza', basePrice: 299, foodType: 'veg', featured: true },
  { name: 'Mushroom & Corn Pizza', basePrice: 259, foodType: 'veg' },
  { name: 'Cheese Burst Pizza', basePrice: 349, foodType: 'veg' },
  { name: 'Chicken Tikka Pizza', basePrice: 329, foodType: 'non-veg' },
  { name: 'BBQ Chicken Pizza', basePrice: 339, foodType: 'non-veg' },
  { name: 'Chicken Pepperoni Pizza', basePrice: 359, foodType: 'non-veg' },
  { name: 'Meat Lovers Pizza', basePrice: 399, foodType: 'non-veg' }
]);

// Momos (10 items)
addProducts('momos', [
  { name: 'Steamed Veg Momos', basePrice: 80, foodType: 'veg' },
  { name: 'Fried Veg Momos', basePrice: 90, foodType: 'veg' },
  { name: 'Paneer Steamed Momos', basePrice: 100, foodType: 'veg' },
  { name: 'Paneer Fried Momos', basePrice: 110, foodType: 'veg' },
  { name: 'Kurkure Veg Momos', basePrice: 130, foodType: 'veg', featured: true },
  { name: 'Steamed Chicken Momos', basePrice: 110, foodType: 'non-veg' },
  { name: 'Fried Chicken Momos', basePrice: 120, foodType: 'non-veg' },
  { name: 'Kurkure Chicken Momos', basePrice: 150, foodType: 'non-veg', featured: true },
  { name: 'Chilli Chicken Momos', basePrice: 160, foodType: 'non-veg' },
  { name: 'Tandoori Momos', basePrice: 140, foodType: 'veg' }
]);

// Sandwich (10 items)
addProducts('sandwich', [
  { name: 'Veg Cheese Sandwich', basePrice: 89, foodType: 'veg' },
  { name: 'Bombay Sandwich', basePrice: 99, foodType: 'veg' },
  { name: 'Paneer Tikka Sandwich', basePrice: 129, foodType: 'veg' },
  { name: 'Corn & Cheese Sandwich', basePrice: 119, foodType: 'veg' },
  { name: 'Club Sandwich', basePrice: 149, foodType: 'veg', featured: true },
  { name: 'Grilled Mushroom Sandwich', basePrice: 139, foodType: 'veg' },
  { name: 'Chicken Tikka Sandwich', basePrice: 159, foodType: 'non-veg' },
  { name: 'Chicken Mayo Sandwich', basePrice: 149, foodType: 'non-veg' },
  { name: 'Egg Sandwich', basePrice: 109, foodType: 'non-veg' },
  { name: 'Chicken Club Sandwich', basePrice: 179, foodType: 'non-veg', featured: true }
]);

// French Fries (8 items)
addProducts('french-fries', [
  { name: 'Classic Salted Fries', basePrice: 79, foodType: 'veg' },
  { name: 'Peri Peri Fries', basePrice: 99, foodType: 'veg', featured: true },
  { name: 'Cheese Loaded Fries', basePrice: 129, foodType: 'veg' },
  { name: 'Mexican Salsa Fries', basePrice: 139, foodType: 'veg' },
  { name: 'BBQ Fries', basePrice: 119, foodType: 'veg' },
  { name: 'Chicken Loaded Fries', basePrice: 169, foodType: 'non-veg' },
  { name: 'Tandoori Fries', basePrice: 109, foodType: 'veg' },
  { name: 'Cheesy Jalapeno Fries', basePrice: 149, foodType: 'veg' }
]);

// Pasta (8 items)
addProducts('pasta', [
  { name: 'Red Sauce Pasta', basePrice: 179, foodType: 'veg' },
  { name: 'White Sauce Pasta', basePrice: 189, foodType: 'veg', featured: true },
  { name: 'Pink Sauce Pasta', basePrice: 199, foodType: 'veg' },
  { name: 'Arrabbiata Pasta', basePrice: 179, foodType: 'veg' },
  { name: 'Chicken Alfredo Pasta', basePrice: 229, foodType: 'non-veg' },
  { name: 'Chicken Arrabbiata Pasta', basePrice: 219, foodType: 'non-veg' },
  { name: 'Pesto Pasta', basePrice: 209, foodType: 'veg' },
  { name: 'Baked Cheese Pasta', basePrice: 249, foodType: 'veg' }
]);

// Maggi (8 items)
addProducts('maggi', [
  { name: 'Classic Masala Maggi', basePrice: 50, foodType: 'veg' },
  { name: 'Vegetable Maggi', basePrice: 70, foodType: 'veg' },
  { name: 'Cheese Maggi', basePrice: 80, foodType: 'veg', featured: true },
  { name: 'Peri Peri Maggi', basePrice: 75, foodType: 'veg' },
  { name: 'Egg Maggi', basePrice: 80, foodType: 'non-veg' },
  { name: 'Chicken Maggi', basePrice: 100, foodType: 'non-veg' },
  { name: 'Tandoori Maggi', basePrice: 90, foodType: 'veg' },
  { name: 'Double Masala Maggi', basePrice: 60, foodType: 'veg' }
]);

// Wraps (8 items)
addProducts('wraps', [
  { name: 'Veg Kathi Roll', basePrice: 99, foodType: 'veg' },
  { name: 'Paneer Tikka Wrap', basePrice: 129, foodType: 'veg', featured: true },
  { name: 'Mexican Veg Wrap', basePrice: 119, foodType: 'veg' },
  { name: 'Aloo Wrap', basePrice: 89, foodType: 'veg' },
  { name: 'Chicken Kathi Roll', basePrice: 139, foodType: 'non-veg' },
  { name: 'Chicken Tikka Wrap', basePrice: 159, foodType: 'non-veg', featured: true },
  { name: 'Egg Roll', basePrice: 109, foodType: 'non-veg' },
  { name: 'Mutton Seekh Roll', basePrice: 189, foodType: 'non-veg' }
]);

// Coffee (8 items)
addProducts('coffee', [
  { name: 'Hot Espresso', basePrice: 79, foodType: 'veg' },
  { name: 'Cappuccino', basePrice: 109, foodType: 'veg', featured: true },
  { name: 'Cafe Latte', basePrice: 119, foodType: 'veg' },
  { name: 'Americano', basePrice: 99, foodType: 'veg' },
  { name: 'Cold Coffee', basePrice: 129, foodType: 'veg', featured: true },
  { name: 'Hazelnut Cold Coffee', basePrice: 149, foodType: 'veg' },
  { name: 'Mocha Frappe', basePrice: 159, foodType: 'veg' },
  { name: 'Caramel Macchiato', basePrice: 139, foodType: 'veg' }
]);

// Shakes (8 items)
addProducts('shakes', [
  { name: 'Vanilla Shake', basePrice: 119, foodType: 'veg' },
  { name: 'Chocolate Shake', basePrice: 129, foodType: 'veg', featured: true },
  { name: 'Strawberry Shake', basePrice: 129, foodType: 'veg' },
  { name: 'Oreo Shake', basePrice: 149, foodType: 'veg', featured: true },
  { name: 'KitKat Shake', basePrice: 149, foodType: 'veg' },
  { name: 'Mango Shake', basePrice: 139, foodType: 'veg' },
  { name: 'Brownie Shake', basePrice: 169, foodType: 'veg' },
  { name: 'Butterscotch Shake', basePrice: 139, foodType: 'veg' }
]);

// Mocktails (8 items)
addProducts('mocktails', [
  { name: 'Virgin Mojito', basePrice: 119, foodType: 'veg', featured: true },
  { name: 'Blue Lagoon', basePrice: 129, foodType: 'veg' },
  { name: 'Green Apple Mojito', basePrice: 129, foodType: 'veg' },
  { name: 'Watermelon Mojito', basePrice: 139, foodType: 'veg' },
  { name: 'Pina Colada', basePrice: 149, foodType: 'veg' },
  { name: 'Sunrise Cooler', basePrice: 139, foodType: 'veg' },
  { name: 'Strawberry Lemonade', basePrice: 119, foodType: 'veg' },
  { name: 'Peach Iced Tea', basePrice: 109, foodType: 'veg' }
]);

// Soft Drinks (6 items)
addProducts('soft-drinks', [
  { name: 'Coca Cola', basePrice: 40, foodType: 'veg' },
  { name: 'Sprite', basePrice: 40, foodType: 'veg' },
  { name: 'Fanta', basePrice: 40, foodType: 'veg' },
  { name: 'Thumbs Up', basePrice: 40, foodType: 'veg' },
  { name: 'Mineral Water', basePrice: 20, foodType: 'veg' },
  { name: 'Diet Coke', basePrice: 50, foodType: 'veg' }
]);

// Desserts (8 items)
addProducts('desserts', [
  { name: 'Chocolate Brownie', basePrice: 99, foodType: 'veg', featured: true },
  { name: 'Brownie with Ice Cream', basePrice: 149, foodType: 'veg' },
  { name: 'Choco Lava Cake', basePrice: 119, foodType: 'veg' },
  { name: 'Red Velvet Pastry', basePrice: 129, foodType: 'veg' },
  { name: 'Black Forest Pastry', basePrice: 109, foodType: 'veg' },
  { name: 'Vanilla Ice Cream', basePrice: 79, foodType: 'veg' },
  { name: 'Chocolate Ice Cream', basePrice: 89, foodType: 'veg' },
  { name: 'Gulab Jamun', basePrice: 60, foodType: 'veg' }
]);

// Combos (10 items)
addProducts('combos', [
  { name: 'Burger Fries Combo', basePrice: 149, foodType: 'veg' },
  { name: 'Burger Coke Combo', basePrice: 119, foodType: 'veg' },
  { name: 'Pizza Coke Combo', basePrice: 249, foodType: 'veg', featured: true },
  { name: 'Pasta Garlic Bread Combo', basePrice: 259, foodType: 'veg' },
  { name: 'Chicken Burger Fries Combo', basePrice: 189, foodType: 'non-veg' },
  { name: 'Chicken Pizza Coke Combo', basePrice: 369, foodType: 'non-veg' },
  { name: 'Momos Coke Combo', basePrice: 129, foodType: 'veg' },
  { name: 'Wrap Fries Coke Combo', basePrice: 219, foodType: 'veg' },
  { name: 'Chicken Wrap Fries Coke Combo', basePrice: 259, foodType: 'non-veg' },
  { name: 'Couple Combo', basePrice: 499, foodType: 'veg', description: '2 Veg Burgers, Large Fries, 2 Cokes, 1 Choco Lava Cake' }
]);

fs.writeFileSync('seed-data/products.json', JSON.stringify(products, null, 2));

console.log(`Generated ${categories.length} categories and ${products.length} products.`);
