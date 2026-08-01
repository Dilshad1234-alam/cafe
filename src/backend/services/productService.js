import "server-only";
import MenuItem from "../models/MenuItem";
import Category from "../models/Category";
import Order from "../models/Order";
import { createSlug } from "../utils/createSlug";

export async function getAdminProducts(query = {}) {
  const { search, category, foodType, status, featured, page = 1, limit = 10, sort = "createdAt" } = query;
  
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (category && category !== "all") {
    filter.category = category;
  }
  if (foodType && foodType !== "all") {
    filter.foodType = foodType;
  }
  if (status && status !== "all") {
    filter.isAvailable = status === "active";
  }
  if (featured === "true") {
    filter.isFeatured = true;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const sortOptions = {};
  if (sort === "name") sortOptions.name = 1;
  else if (sort === "priceAsc") sortOptions.basePrice = 1;
  else if (sort === "priceDesc") sortOptions.basePrice = -1;
  else sortOptions.createdAt = -1;

  const [products, total] = await Promise.all([
    MenuItem.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)).lean(),
    MenuItem.countDocuments(filter)
  ]);

  // Optionally populate category names for the list if they are ObjectIds
  const categoryIds = products.map(p => p.category).filter(c => typeof c === 'string' && c.match(/^[0-9a-fA-F]{24}$/));
  let categoriesMap = {};
  if (categoryIds.length > 0) {
    const cats = await Category.find({ _id: { $in: categoryIds } }).lean();
    categoriesMap = cats.reduce((acc, c) => ({ ...acc, [c._id.toString()]: c.name }), {});
  }

  const enrichedProducts = products.map(p => ({
    ...p,
    categoryName: categoriesMap[p.category?.toString()] || p.category, // fallback to slug/string if not found
    basePrice: p.basePrice ?? p.price ?? 0 // fallback for legacy data
  }));

  return {
    products: enrichedProducts,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getProductById(id) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid product ID");
  }
  const product = await MenuItem.findById(id).lean();
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export async function createProduct(data) {
  // Verify category exists
  const categoryStr = data.category;
  let categoryObj = null;
  
  if (categoryStr.match(/^[0-9a-fA-F]{24}$/)) {
    categoryObj = await Category.findById(categoryStr);
  } else {
    // legacy string slug
    categoryObj = await Category.findOne({ slug: categoryStr });
  }

  if (!categoryObj) {
    throw new Error(`Category "${categoryStr}" does not exist`);
  }

  const slug = createSlug(data.name);
  const existingProduct = await MenuItem.findOne({ slug });
  
  if (existingProduct) {
    throw new Error(`Product with name "${data.name}" or slug "${slug}" already exists`);
  }

  const newProduct = new MenuItem({
    ...data,
    slug
  });

  await newProduct.save();
  return newProduct.toObject();
}

export async function updateProduct(id, data) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid product ID");
  }

  const product = await MenuItem.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Verify category exists
  const categoryStr = data.category || product.category;
  let categoryObj = null;
  if (categoryStr?.toString().match(/^[0-9a-fA-F]{24}$/)) {
    categoryObj = await Category.findById(categoryStr);
  } else {
    categoryObj = await Category.findOne({ slug: categoryStr });
  }

  if (!categoryObj) {
    throw new Error(`Category "${categoryStr}" does not exist`);
  }

  let newSlug = product.slug;
  if (data.name && data.name !== product.name) {
    newSlug = createSlug(data.name);
    const existing = await MenuItem.findOne({ slug: newSlug, _id: { $ne: id } });
    if (existing) {
      throw new Error(`Product with name "${data.name}" already exists`);
    }
  }

  Object.assign(product, data);
  product.slug = newSlug;

  await product.save();
  return product.toObject();
}

export async function updateProductAvailability(id, isAvailable) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid product ID");
  }
  
  const product = await MenuItem.findByIdAndUpdate(
    id, 
    { isAvailable }, 
    { new: true }
  ).lean();
  
  if (!product) {
    throw new Error("Product not found");
  }
  
  return product;
}

export async function updateProductFeatured(id, isFeatured) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid product ID");
  }
  
  const product = await MenuItem.findByIdAndUpdate(
    id, 
    { isFeatured }, 
    { new: true }
  ).lean();
  
  if (!product) {
    throw new Error("Product not found");
  }
  
  return product;
}

export async function deleteProduct(id) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid product ID");
  }

  const product = await MenuItem.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Do not hard-delete products referenced by orders
  const ordersCount = await Order.countDocuments({ "items.menuItemId": id });

  if (ordersCount > 0) {
    // Archive it
    product.isAvailable = false;
    await product.save();
    return { success: true, archived: true, message: `Product "${product.name}" is referenced in ${ordersCount} order(s). It has been archived (set to inactive) instead of deleted.` };
  }

  await MenuItem.findByIdAndDelete(id);
  return { success: true, archived: false, message: `Product "${product.name}" deleted successfully` };
}
