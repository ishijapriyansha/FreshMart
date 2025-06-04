import axios from 'axios';
import { Product, APIProduct } from '../types';

const API_BASE_URL = 'https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s';

// Convert price string (e.g., "£2") to number
const parsePrice = (price: string): number => {
  return parseFloat(price.replace('£', ''));
};

// Transform API product to application product
const transformProduct = (apiProduct: APIProduct): Product => {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    category: apiProduct.type,
    price: parsePrice(apiProduct.price),
    stock: apiProduct.available,
    description: apiProduct.description,
    image: apiProduct.img
  };
};

export const fetchProducts = async (category: string = 'all'): Promise<Product[]> => {
  try {
    const response = await axios.get<APIProduct[]>(`${API_BASE_URL}?category=${category}`);
    return response.data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const searchProducts = async (query: string, products: Product[]): Promise<Product[]> => {
  if (!query.trim()) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      (product.category || '').toLowerCase().includes(searchTerm)
  );
};