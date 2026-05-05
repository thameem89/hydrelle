import productsData from '../hydrelle_products.json';
import { Product } from './types';

export function getProducts(): Product[] {
  return productsData.map((item: any) => {
    // Extract ID from URL like "https://hydrelleskincare.com/product/5"
    const id = item.url.split('/').pop() || Math.random().toString(36).substr(2, 9);
    
    // Parse price: "AED 99.00 / $26.95" -> numericPrice = 99.00
    const priceParts = item.price.split('/');
    const aedPart = priceParts[0].replace('AED', '').trim();
    const numericPrice = parseFloat(aedPart);
    
    return {
      ...item,
      id,
      displayPrice: item.price,
      numericPrice,
      currency: 'AED'
    };
  });
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}
