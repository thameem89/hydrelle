export interface Product {
  id: string;
  name: string;
  url: string;
  price: string;
  displayPrice: string; // The original price string
  numericPrice: number; // For calculations
  currency: string;
  category: string;
  image_url: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
