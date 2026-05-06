import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '@/lib/database';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    
    // Calculate values
    const priceAed = parseFloat(newProduct.price_aed) || 0;
    const productToSave = {
      name: newProduct.name || 'Unnamed Product',
      category: newProduct.category || 'Serum',
      price_aed: priceAed,
      price_usd: priceAed / 3.67,
      amazon_link: newProduct.amazon_link || '',
      description: newProduct.description || '',
      image_url: newProduct.image_url || '',
      images: newProduct.images || [],
      videos: [],
      details: {
        product_presentation: newProduct.description || '',
        features: [],
        presentation_image: null
      },
      price: `AED ${priceAed.toFixed(2)}`
    };

    // Try Supabase
    const supabaseResult = await addProduct(productToSave);
    if (supabaseResult) {
      return NextResponse.json({ success: true, product: supabaseResult });
    }

    // Fallback to JSON
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    const finalProduct = {
      ...productToSave,
      id: Math.max(...data.products.map((p: any) => p.id || 0)) + 1
    };

    data.products.push(finalProduct);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, product: finalProduct });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ success: false, error: 'Failed to save product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    const { id, ...updateData } = updatedProduct;

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
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    const index = data.products.findIndex((p: any) => String(p.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    data.products[index] = { ...data.products[index], ...updateData };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, product: data.products[index] });
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
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    data.products = data.products.filter((p: any) => String(p.id) !== String(id));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}


