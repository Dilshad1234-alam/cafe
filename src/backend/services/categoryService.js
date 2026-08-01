import "server-only";
import Category from "../models/Category";
import MenuItem from "../models/MenuItem";
import { createSlug } from "../utils/createSlug";

export async function getAdminCategories(query = {}) {
  const { search, status, page = 1, limit = 10, sort = "sortOrder" } = query;
  
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (status && status !== "all") {
    filter.isActive = status === "active";
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // Sort by sortOrder, then name
  const sortOptions = {};
  if (sort === "sortOrder") {
    sortOptions.sortOrder = 1;
    sortOptions.name = 1;
  } else if (sort === "name") {
    sortOptions.name = 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const [categories, total] = await Promise.all([
    Category.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)).lean(),
    Category.countDocuments(filter)
  ]);

  return {
    categories,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  };
}

export async function getCategoryById(id) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid category ID");
  }
  const category = await Category.findById(id).lean();
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
}

export async function createCategory(data) {
  const slug = createSlug(data.name);
  
  const existingCategory = await Category.findOne({ 
    $or: [{ name: data.name }, { slug }] 
  });
  
  if (existingCategory) {
    throw new Error(`Category with name "${data.name}" or slug "${slug}" already exists`);
  }

  const newCategory = new Category({
    ...data,
    slug
  });

  await newCategory.save();
  return newCategory.toObject();
}

export async function updateCategory(id, data) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid category ID");
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }

  // If name changed, we DO NOT automatically change the slug here,
  // to avoid breaking existing URLs. Or we do, depending on preference.
  // The prompt says "Generate slug server-side. Do not allow manual slug editing."
  // So if name changes, we generate a new slug.
  let newSlug = category.slug;
  if (data.name && data.name !== category.name) {
    newSlug = createSlug(data.name);
    const existing = await Category.findOne({ slug: newSlug, _id: { $ne: id } });
    if (existing) {
      throw new Error(`Category with name "${data.name}" already exists`);
    }
  }

  category.name = data.name || category.name;
  category.slug = newSlug;
  category.description = data.description !== undefined ? data.description : category.description;
  category.image = data.image !== undefined ? data.image : category.image;
  category.isActive = data.isActive !== undefined ? data.isActive : category.isActive;
  category.sortOrder = data.sortOrder !== undefined ? data.sortOrder : category.sortOrder;

  await category.save();
  return category.toObject();
}

export async function updateCategoryStatus(id, isActive) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid category ID");
  }
  
  const category = await Category.findByIdAndUpdate(
    id, 
    { isActive }, 
    { new: true }
  ).lean();
  
  if (!category) {
    throw new Error("Category not found");
  }
  
  return category;
}

export async function deleteCategory(id) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid category ID");
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }

  // Block deletion if products reference the category
  // Since we have a legacy string reference in MenuItem, check both ID and slug
  const productsCount = await MenuItem.countDocuments({
    $or: [
      { category: id }, // Phase 3 Object ID
      { category: category.slug } // Phase 1 Legacy string
    ]
  });

  if (productsCount > 0) {
    throw new Error(`Cannot delete "${category.name}". It is currently used by ${productsCount} product(s). Please deactivate the category instead.`);
  }

  await Category.findByIdAndDelete(id);
  return { success: true, message: `Category "${category.name}" deleted successfully` };
}
