export interface APIProduct {
  id: number;
  type: string;
  name: string;
  description: string;
  rating: number;
  img: string;
  price: string;
  available: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isFree?: boolean;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  type: 'buy_x_get_y_free';
  triggerProductId: string;
  triggerQuantity: number;
  freeProductId: string;
  freeQuantity: number;
}