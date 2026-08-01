import { NextResponse } from "next/server";
import { 
  getAdminCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  updateCategoryStatus, 
  deleteCategory 
} from "../services/categoryService";
import { validateCategory } from "../validations/categoryValidation";

export async function listAdminCategoriesController(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = {
      search: searchParams.get("search"),
      status: searchParams.get("status"),
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      sort: searchParams.get("sort")
    };
    
    const result = await getAdminCategories(query);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("listAdminCategoriesController error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch categories" }, { status: 500 });
  }
}

export async function getAdminCategoryController(request, { params }) {
  try {
    const { id } = await params;
    const category = await getCategoryById(id);
    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid category ID" || error.message === "Category not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function createCategoryController(request) {
  try {
    const body = await request.json();
    const validation = validateCategory(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: validation.errors }, { status: 400 });
    }
    
    const category = await createCategory(validation.data);
    return NextResponse.json({ success: true, data: category, message: "Category created successfully" }, { status: 201 });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to create category" }, { status: 500 });
  }
}

export async function updateCategoryController(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = validateCategory(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: validation.errors }, { status: 400 });
    }
    
    const category = await updateCategory(id, validation.data);
    return NextResponse.json({ success: true, data: category, message: "Category updated successfully" }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid category ID" || error.message === "Category not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message.includes("already exists")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update category" }, { status: 500 });
  }
}

export async function updateCategoryStatusController(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (typeof body.isActive !== 'boolean') {
      return NextResponse.json({ success: false, message: "isActive boolean is required" }, { status: 400 });
    }
    
    const category = await updateCategoryStatus(id, body.isActive);
    return NextResponse.json({ success: true, data: category, message: "Category status updated" }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid category ID" || error.message === "Category not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update status" }, { status: 500 });
  }
}

export async function deleteCategoryController(request, { params }) {
  try {
    const { id } = await params;
    const result = await deleteCategory(id);
    return NextResponse.json({ success: true, message: result.message }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid category ID" || error.message === "Category not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message.includes("Cannot delete")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to delete category" }, { status: 500 });
  }
}
