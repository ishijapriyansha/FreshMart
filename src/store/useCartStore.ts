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

      setProducts: (products) => set({ products }),

      addToCart: (product) => {
        const currentItems = [...get().cartItems];
        const item = currentItems.find(i => i.product.id === product.id && !i.isFree);

        if (item) item.quantity += 1;
        else currentItems.push({ product, quantity: 1, isFree: false });

        const updated = applyOffers(currentItems, get().products);
        updateTotals(set, updated);
      },

      updateQuantity: (productId, quantity) => {
        let items = get().cartItems.filter(i => !(i.product.id === productId && !i.isFree && quantity <= 0));
        const item = items.find(i => i.product.id === productId && !i.isFree);
        if (item) item.quantity = quantity;

        const updated = applyOffers(items, get().products);
        updateTotals(set, updated);
      },

      removeFromCart: (productId) => {

  const filtered = get().cartItems.filter(i => i.product.id !== productId);
  const updated = applyOffers(filtered, get().products);
  updateTotals(set, updated);
},

    }),
    { name: 'cart-store' }
  )
);

function updateTotals(setFn: any, cartItems: CartItem[]) {
  const subtotal = cartItems.filter(i => !i.isFree).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = calculateDiscount(cartItems);
  const total = subtotal - discount;

  setFn({ cartItems, subtotal, discount, total });
}