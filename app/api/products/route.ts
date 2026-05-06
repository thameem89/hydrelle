import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '@/lib/database';
import { getJsonProducts } from '@/lib/json-db';

export async function GET() {
  try {
    const supabaseProducts = await getAllProducts();
    if (supabaseProducts) {
      return NextResponse.json({ products: supabaseProducts });
    }

    const products = getJsonProducts();
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    
    const images = newProduct.images || [];
    const productToSave = {
      name: newProduct.name || 'Unnamed Product',
      category: newProduct.category || 'Serum',
      price_aed: priceAed,
      price_usd: priceAed / 3.67,
      amazon_link: newProduct.amazon_link || '',
      description: newProduct.description || '',
      image_url: newProduct.image_url || (images.length > 0 ? images[0] : ''),
      images: images,
      videos: [],
      details: {
        product_presentation: newProduct.description || '',
        features: [],
        presentation_image: null
      },
      price: `AED ${priceAed.toFixed(2)}`
    };

    try {
      const supabaseResult = await addProduct(productToSave);
      if (supabaseResult) {
        return NextResponse.json({ success: true, product: supabaseResult });
      }
    } catch (supabaseError: any) {
      console.error('Supabase Error:', supabaseError);
      return NextResponse.json({ success: false, error: `Supabase Error: ${supabaseError.message}` }, { status: 500 });
    }

    // Fallback to JSON
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const products = getJsonProducts();

    const finalProduct = {
      ...productToSave,
      id: Math.max(...products.map((p: any) => p.id || 0)) + 1
    };

    const updatedData = { products: [...products, finalProduct] };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true, product: finalProduct });
  } catch (error: any) {
    console.error('Error saving product:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to save product' }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    const { id, ...updateData } = updatedProduct;

    // Ensure image_url is set if images are provided
    if (updateData.images && updateData.images.length > 0 && !updateData.image_url) {
      updateData.image_url = updateData.images[0];
    }
    // Recalculate price strings
    if (updateData.price_aed) {
      const priceAed = parseFloat(updateData.price_aed);
      updateData.price_usd = priceAed / 3.67;
      updateData.price = `AED ${priceAed.toFixed(2)}`;
    }

    // Try Supabase
    const supabaseResult = await updateProduct(id, updateData);
    if (supabaseResult) {
      return NextResponse.json({ success: true, product: supabaseResult });
    }

    // Fallback to JSON
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const products = getJsonProducts();

    const index = products.findIndex((p: any) => String(p.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    products[index] = { ...products[index], ...updateData };
    const updatedData = { products };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    // Try Supabase
    const supabaseSuccess = await deleteProduct(id);
    if (supabaseSuccess) {
      return NextResponse.json({ success: true });
    }

    // Fallback to JSON
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const products = getJsonProducts();

    const updatedProducts = products.filter((p: any) => String(p.id) !== String(id));
    const updatedData = { products: updatedProducts };
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}



