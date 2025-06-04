import { create } from 'zustand';
import { Product } from '../types';
import { fetchProducts, searchProducts } from '../lib/api';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<void>;
  setCategory: (category: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedCategory: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
  
  fetchAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts('all');
      set({ 
        products,
        filteredProducts: products,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch products',
        isLoading: false
      });
    }
  },
  
  setCategory: async (category: string) => {
    set({ isLoading: true, selectedCategory: category, error: null });
    try {
      let products;
      if (category === 'all') {
        products = await fetchProducts('all');
      } else {
        products = await fetchProducts(category);
      }
      
      // Apply search query if it exists
      const { searchQuery } = get();
      let filteredProducts = products;
      
      if (searchQuery) {
        filteredProducts = await searchProducts(searchQuery, products);
      }
      
      set({ 
        products,
        filteredProducts,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch products',
        isLoading: false
      });
    }
  },
  
  setSearchQuery: async (query: string) => {
    set({ searchQuery: query });
    const { products } = get();
    
    if (query.trim() === '') {
      set({ filteredProducts: products });
    } else {
      const filtered = await searchProducts(query, products);
      set({ filteredProducts: filtered });
    }
  }
}));

export default useProductStore;