import productsData from '../hydrelle_products.json';
import { Product } from './types';
import { getAllProducts } from './database';

export async function getProducts(): Promise<Product[]> {
  try {
    const productsArray = await getAllProducts();
    
    return productsArray.map((item: any) => {
    // Extract ID
    const id = item.id ? String(item.id) : (item.url ? item.url.split('/').pop() : Math.random().toString(36).substr(2, 9));
    
    // Price
    let displayPrice = item.price || `AED ${item.price_aed?.toFixed(2)} / $${item.price_usd?.toFixed(2)}`;
    let numericPrice = item.numericPrice || item.price_aed;
    
    if (item.price && !item.price_aed) {
      const aedPart = item.price.split('/')[0].replace('AED', '').trim();
      numericPrice = parseFloat(aedPart);
    }
    
    // Media
    const image_url = item.image_url || (item.images && item.images.length > 0 ? item.images[0] : '');
    let videos = item.videos || [];
    if (item.video && videos.length === 0) {
      videos = [item.video];
    }
    
    // Details
    const details = item.details || {
      product_presentation: item.description,
      features: item.features || [],
      benefits: item.benefits || [],
      presentation_image: item.presentation_image || null,
    };
    
    return {
      ...item,
      id,
      displayPrice,
      numericPrice,
      currency: 'AED',
      image_url,
      videos,
      details
    };
  });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => String(p.id) === String(id));
}
