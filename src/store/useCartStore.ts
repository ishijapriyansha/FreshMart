import { create } from 'zustand';
import { Product, CartItem } from '../types';
import { applyOffers, calculateDiscount } from '../lib/offers';

interface CartStore {
  cartItems: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
  subtotal: number;
  discount: number;
  total: number;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  products: [],
  
  setProducts: (products: Product[]) => {
    set({ products });
    // Re-apply offers when products change
    const { cartItems } = get();
    const updatedCart = applyOffers(cartItems, products);
    const discount = calculateDiscount(updatedCart);
    const subtotal = calculateSubtotal(updatedCart);
    set({ 
      cartItems: updatedCart,
      subtotal,
      discount,
      total: subtotal - discount
    });
  },
  
  addToCart: (product: Product) => {
    const { cartItems, products } = get();
    
    // Find existing cart item
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && !item.isFree
    );
    
    let updatedCart: CartItem[];
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
    } else {
      // Add new item
      updatedCart = [...cartItems, { product, quantity: 1 }];
    }
    
    // Apply offers
    updatedCart = applyOffers(updatedCart, products);
    
    // Calculate financials
    const discount = calculateDiscount(updatedCart);
    const subtotal = calculateSubtotal(updatedCart);
    
    set({ 
      cartItems: updatedCart,
      subtotal,
      discount,
      total: subtotal - discount
    });
  },
  
  removeFromCart: (productId: string) => {
    const { cartItems, products } = get();
    
    // Filter out the item
    let updatedCart = cartItems.filter(
      item => !(item.product.id === productId && !item.isFree)
    );
    
    // Re-apply offers
    updatedCart = applyOffers(updatedCart, products);
    
    // Calculate financials
    const discount = calculateDiscount(updatedCart);
    const subtotal = calculateSubtotal(updatedCart);
    
    set({ 
      cartItems: updatedCart,
      subtotal,
      discount,
      total: subtotal - discount
    });
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    const { cartItems, products } = get();
    
    let updatedCart: CartItem[];
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      updatedCart = cartItems.filter(
        item => !(item.product.id === productId && !item.isFree)
      );
    } else {
      // Update quantity
      updatedCart = cartItems.map(item => 
        item.product.id === productId && !item.isFree
          ? { ...item, quantity }
          : item
      );
    }
    
    // Re-apply offers
    updatedCart = applyOffers(updatedCart, products);
    
    // Calculate financials
    const discount = calculateDiscount(updatedCart);
    const subtotal = calculateSubtotal(updatedCart);
    
    set({ 
      cartItems: updatedCart,
      subtotal,
      discount,
      total: subtotal - discount
    });
  },
  
  clearCart: () => {
    set({ 
      cartItems: [],
      subtotal: 0,
      discount: 0,
      total: 0
    });
  },
  
  subtotal: 0,
  discount: 0,
  total: 0
}));

// Helper to calculate subtotal
const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

export default useCartStore;