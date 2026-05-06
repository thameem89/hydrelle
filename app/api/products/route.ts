import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    // Add ID if not present
    if (!newProduct.id) {
      newProduct.id = Math.max(...data.products.map((p: any) => p.id || 0)) + 1;
    }

    // Add default values for required fields in the JSON schema
    const productToSave = {
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category || 'General',
      price_aed: parseFloat(newProduct.price_aed) || 0,
      price_usd: (parseFloat(newProduct.price_aed) || 0) / 3.67,
      amazon_link: newProduct.amazon_link || '',
      description: newProduct.description || '',
      image_url: newProduct.image_url || '',
      images: newProduct.image_url ? [newProduct.image_url] : [],
      videos: [],
      details: {
        product_presentation: newProduct.description || '',
        features: [],
        presentation_image: null
      }
    };

    data.products.push(productToSave);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, product: productToSave });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ success: false, error: 'Failed to save product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    const filePath = path.join(process.cwd(), 'hydrelle_products.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    const index = data.products.findIndex((p: any) => String(p.id) === String(updatedProduct.id));
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    data.products[index] = { ...data.products[index], ...updatedProduct };
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

