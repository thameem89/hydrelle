import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const adminClient = getSupabaseAdmin();
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // Upload to Supabase Storage bucket 'product-images'
    const { data, error } = await adminClient.storage
      .from('product-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Supabase Storage Error Details:', error);
      return NextResponse.json({ 
        success: false, 
        error: `Supabase Storage Error: ${error.message}`,
        details: error
      }, { status: 500 });
    }

    // Get Public URL
    const { data: { publicUrl } } = adminClient.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}

