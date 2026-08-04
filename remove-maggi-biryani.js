import mongoose from "mongoose";
import MenuItem from "./src/backend/models/MenuItem.js";
import Category from "./src/backend/models/Category.js";


const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  if (!MONGODB_URI) {
    console.error("No MongoDB URI found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Remove categories
    const categoriesResult = await Category.deleteMany({
      $or: [
        { slug: { $regex: "maggi", $options: "i" } },
        { slug: { $regex: "biryani", $options: "i" } },
        { name: { $regex: "maggi", $options: "i" } },
        { name: { $regex: "biryani", $options: "i" } }
      ]
    });
    console.log(`Deleted ${categoriesResult.deletedCount} categories.`);

    // Remove menu items
    const productsResult = await MenuItem.deleteMany({
      $or: [
        { slug: { $regex: "maggi", $options: "i" } },
        { slug: { $regex: "biryani", $options: "i" } },
        { category: { $regex: "maggi", $options: "i" } },
        { category: { $regex: "biryani", $options: "i" } },
        { name: { $regex: "maggi", $options: "i" } },
        { name: { $regex: "biryani", $options: "i" } }
      ]
    });
    console.log(`Deleted ${productsResult.deletedCount} menu items.`);

    console.log("Cleanup complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

run();
