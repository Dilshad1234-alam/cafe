import { NextResponse } from 'next/server';
import { requireAdminUser } from '@/backend/middleware/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    // 1. Authenticate Admin
    await requireAdminUser();

    // 2. Parse the form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
    }

    // 4. Generate unique filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name.replace(/\s+/g, '-');
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalName}`;

    // 5. Define upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Error creating upload directory:', err);
      // Ignore if directory already exists
    }

    // 6. Write file to disk
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // 7. Return the public URL
    const publicUrl = `/uploads/products/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      message: 'Image uploaded successfully' 
    });

  } catch (error) {
    console.error('Upload Error:', error);
    
    // Check if it's an auth error from our middleware
    if (error.message === 'Authentication required' || error.message === 'Forbidden') {
      return NextResponse.json({ success: false, error: error.message }, { status: error.message === 'Forbidden' ? 403 : 401 });
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
