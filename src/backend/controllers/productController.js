import { NextResponse } from "next/server";
import { 
  getAdminProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  updateProductAvailability,
  updateProductFeatured,
  deleteProduct 
} from "../services/productService";
import { validateProduct } from "../validations/productValidation";

export async function listAdminProductsController(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = {
      search: searchParams.get("search"),
      category: searchParams.get("category"),
      foodType: searchParams.get("foodType"),
      status: searchParams.get("status"),
      featured: searchParams.get("featured"),
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      sort: searchParams.get("sort")
    };
    
    const result = await getAdminProducts(query);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("listAdminProductsController error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function getAdminProductController(request, { params }) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function createProductController(request) {
  try {
    const body = await request.json();
    const validation = validateProduct(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: validation.errors }, { status: 400 });
    }
    
    const product = await createProduct(validation.data);
    return NextResponse.json({ success: true, data: product, message: "Product created successfully" }, { status: 201 });
  } catch (error) {
    if (error.message.includes("already exists") || error.message.includes("does not exist")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to create product" }, { status: 500 });
  }
}

export async function updateProductController(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = validateProduct(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: validation.errors }, { status: 400 });
    }
    
    const product = await updateProduct(id, validation.data);
    return NextResponse.json({ success: true, data: product, message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    if (error.message.includes("already exists") || error.message.includes("does not exist")) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function updateProductAvailabilityController(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (typeof body.isAvailable !== 'boolean') {
      return NextResponse.json({ success: false, message: "isAvailable boolean is required" }, { status: 400 });
    }
    
    const product = await updateProductAvailability(id, body.isAvailable);
    return NextResponse.json({ success: true, data: product, message: "Product availability updated" }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update status" }, { status: 500 });
  }
}

export async function updateProductFeaturedController(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (typeof body.isFeatured !== 'boolean') {
      return NextResponse.json({ success: false, message: "isFeatured boolean is required" }, { status: 400 });
    }
    
    const product = await updateProductFeatured(id, body.isFeatured);
    return NextResponse.json({ success: true, data: product, message: "Product featured status updated" }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update status" }, { status: 500 });
  }
}

export async function deleteProductController(request, { params }) {
  try {
    const { id } = await params;
    const result = await deleteProduct(id);
    return NextResponse.json({ success: true, archived: result.archived, message: result.message }, { status: 200 });
  } catch (error) {
    if (error.message === "Invalid product ID" || error.message === "Product not found") {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to delete product" }, { status: 500 });
  }
}
