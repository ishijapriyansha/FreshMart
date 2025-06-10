import { create } from 'zustand';
import { applyOffers, calculateDiscount } from '../lib/offers';
import { Product, CartItem } from '../types';
import { persist } from 'zustand/middleware'; 

interface CartState {
  cartItems: CartItem[];
  products: Product[]; 
  subtotal: number;
  discount: number;
  total: number;
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      products: [],
      subtotal: 0,
      discount: 0,
      total: 0,

      setProducts: (products) => {
        console.log('Setting products:', products);
        set({ products });
      },

      addToCart: (product) => {
        console.log('Adding to cart:', product);
        const currentItems = [...get().cartItems];
        const item = currentItems.find(i => i.product.id === product.id && !i.isFree);

        if (item) {
          item.quantity += 1;
          console.log('Updated existing item quantity:', item);
        } else {
          currentItems.push({ product, quantity: 1, isFree: false });
          console.log('Added new item to cart');
        }

        const updated = applyOffers(currentItems, get().products);
        console.log('Cart after applying offers:', updated);
        updateTotals(set, updated);
      },

      updateQuantity: (productId, quantity) => {
        console.log('Updating quantity:', { productId, quantity });
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        let items = get().cartItems.filter(i => !i.isFree);
        const item = items.find(i => i.product.id === productId);
        
        if (item) {
          // Check if the requested quantity is within stock limits
          const product = get().products.find(p => p.id === productId);
          if (product && quantity <= product.stock) {
            item.quantity = quantity;
            console.log('Updated item quantity:', item);
          } else {
            console.log('Cannot update quantity: exceeds stock limit');
            return;
          }
        }

        const updated = applyOffers(items, get().products);
        console.log('Cart after applying offers:', updated);
        updateTotals(set, updated);
      },

      removeFromCart: (productId) => {
        console.log('Removing from cart:', productId);
        const filtered = get().cartItems.filter(i => i.product.id !== productId);
        const updated = applyOffers(filtered, get().products);
        console.log('Cart after applying offers:', updated);
        updateTotals(set, updated);
      },
    }),
    { name: 'cart-store' }
  )
);

function updateTotals(setFn: any, cartItems: CartItem[]) {
  const subtotal = cartItems
    .filter(i => !i.isFree)
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const discount = calculateDiscount(cartItems);
  // const discount = 0;
  const total = subtotal;

  console.log('Updating totals:', { subtotal, discount, total });
  setFn({ cartItems, subtotal, discount, total });
}