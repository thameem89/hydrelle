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
  images?: string[];
  videos?: string[];
  description?: string;
  amazon_link?: string;
  details?: {
    product_presentation?: string;
    features?: string[];
    benefits?: string[];
    how_to_use?: string;
    ingredients?: string;
    presentation_image?: string | null;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
