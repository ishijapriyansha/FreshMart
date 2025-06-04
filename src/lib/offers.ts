import { Product, CartItem, Offer } from '../types';

// Predefined offers
export const offers: Offer[] = [
  {
    id: 'coca-cola-offer',
    name: 'Coca-Cola Offer',
    description: 'Buy 6 cans of Coca-Cola, get 1 free',
    type: 'buy_x_get_y_free',
    triggerProductId: 'coca-cola',
    triggerQuantity: 6,
    freeProductId: 'coca-cola',
    freeQuantity: 1
  },
  {
    id: 'croissant-coffee-offer',
    name: 'Croissant Coffee Offer',
    description: 'Buy 3 croissants, get a free coffee',
    type: 'buy_x_get_y_free',
    triggerProductId: 'croissant',
    triggerQuantity: 3,
    freeProductId: 'coffee',
    freeQuantity: 1
  }
];

// Apply offers to cart items
export const applyOffers = (cartItems: CartItem[], products: Product[]): CartItem[] => {
  const result: CartItem[] = [...cartItems];
  let freeItems: CartItem[] = [];

  // First, remove any existing free items
  const regularItems = result.filter(item => !item.isFree);

  // Process each offer
  offers.forEach(offer => {
    const triggerItem = regularItems.find(item => item.product.id === offer.triggerProductId);
    
    if (triggerItem && triggerItem.quantity >= offer.triggerQuantity) {
      // Calculate how many free items to add
      const freeItemsCount = Math.floor(triggerItem.quantity / offer.triggerQuantity) * offer.freeQuantity;
      
      // Find the free product
      const freeProduct = products.find(p => p.id === offer.freeProductId);
      
      if (freeProduct) {
        freeItems.push({
          product: freeProduct,
          quantity: freeItemsCount,
          isFree: true
        });
      }
    }
  });

  return [...regularItems, ...freeItems];
};

// Calculate total discount from applied offers
export const calculateDiscount = (cartItems: CartItem[]): number => {
  return cartItems
    .filter(item => item.isFree)
    .reduce((total, item) => total + (item.product.price * item.quantity), 0);
};