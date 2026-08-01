const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
let MONGODB_URI = process.env.MONGODB_URI;

if (fs.existsSync(envPath) && !MONGODB_URI) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      if (match[1].trim() === 'MONGODB_URI') {
        MONGODB_URI = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  });
}

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// 1. Define Category Schema (mirrors src/backend/models/Category.js)
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 2. Define MenuItem Schema (mirrors src/backend/models/MenuItem.js)
const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    basePrice: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.Mixed, required: true },
    imageUrl: { type: String, default: "" },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isVeg: { type: Boolean, default: true },
    foodType: { type: String, default: "veg" },
    sizes: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }],
    addOns: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }],
    stock: { type: Number, default: 0 },
    preparationTime: { type: Number, default: 15 },
    ingredients: [{ type: String }],
    tags: [{ type: String }],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// We define models dynamically to support both Product or MenuItem (if needed)
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
const Product = mongoose.models.Product || mongoose.model("Product", MenuItemSchema); // fallback just in case

async function runSeed() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("✅ Connected to MongoDB.");

    // Load data
    const categoriesPath = path.join(__dirname, '../seed-data/categories.json');
    const productsPath = path.join(__dirname, '../seed-data/products.json');

    if (!fs.existsSync(categoriesPath) || !fs.existsSync(productsPath)) {
      console.error("❌ Seed data files not found in seed-data/ directory.");
      process.exit(1);
    }

    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    console.log(`\n⏳ Seeding ${categoriesData.length} Categories...`);
    let categoriesCreated = 0;
    
    // UPSERT Categories
    for (const cat of categoriesData) {
      const result = await Category.findOneAndUpdate(
        { slug: cat.slug },
        { $set: cat },
        { upsert: true, new: true }
      );
      if (result) categoriesCreated++;
    }
    console.log(`✅ Upserted ${categoriesCreated} Categories.`);

    // Map categories for foreign keys
    const allCategories = await Category.find({});
    const categoryMap = {};
    allCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    console.log(`\n⏳ Seeding ${productsData.length} Products...`);
    let productsCreated = 0;

    // Use MenuItem model as primary
    const TargetModel = MenuItem;

    // UPSERT Products
    for (const prod of productsData) {
      // Resolve category ObjectId
      const catId = categoryMap[prod.category];
      if (!catId) {
        console.warn(`⚠️ Warning: Category '${prod.category}' not found for product '${prod.name}'. Skipping.`);
        continue;
      }

      const payload = {
        ...prod,
        category: catId,
        price: prod.basePrice, // backward compatibility
        imageUrl: prod.image, // mapping field
        isVeg: prod.foodType === "veg" || prod.foodType === "vegan",
        isAvailable: prod.available,
        isFeatured: prod.featured
      };
      
      // Remove custom keys that aren't in schema directly if they conflict
      delete payload.image;
      delete payload.available;
      delete payload.featured;

      const result = await TargetModel.findOneAndUpdate(
        { slug: prod.slug },
        { $set: payload },
        { upsert: true, new: true }
      );
      if (result) productsCreated++;
    }
    
    console.log(`✅ Upserted ${productsCreated} Products.`);
    
    console.log("\n🎉 Seeding Completed Successfully!");
    console.log("==================================================");
    console.log("REPORT:");
    console.log(`- Categories Upserted: ${categoriesCreated}`);
    console.log(`- Products Upserted:   ${productsCreated}`);
    console.log("==================================================");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

runSeed();
