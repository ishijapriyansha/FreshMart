import { Product, CartItem, Offer } from '../types';

// Predefined offers
export const offers: Offer[] = [
  {
    id: 'coca-cola-offer',
    name: 'Coca-Cola Offer',
    description: 'Buy 6 cans of Coca-Cola, get 1 free',
    type: 'buy_x_get_y_free',
    triggerProductId: '642',
    triggerQuantity: 6,
    freeProductId: '642',
    freeQuantity: 1
  },
  {
    id: 'croissant-coffee-offer',
    name: 'Croissant Coffee Offer',
    description: 'Buy 3 croissants, get a free coffee',
    type: 'buy_x_get_y_free',
    triggerProductId: '532',
    triggerQuantity: 3,
    freeProductId: '641',
    freeQuantity: 1
  }
];

// Apply offers to cart items
export const applyOffers = (cartItems: CartItem[], products: Product[]): CartItem[] => {
  console.log('Applying offers to cart items:', cartItems);
  console.log('Available products:', products);

  const result: CartItem[] = [...cartItems];

  // Separate regular and free items
  const regularItems = result.filter(item => !item.isFree);
  let newFreeItems: CartItem[] = [];

  // Loop through each offer
  offers.forEach(offer => {
    const triggerItem = regularItems.find(item => item.product.id === offer.triggerProductId);

    if (triggerItem && triggerItem.quantity >= offer.triggerQuantity) {
      const freeItemsCount = Math.floor(triggerItem.quantity / offer.triggerQuantity) * offer.freeQuantity;

      const freeProduct = products.find(p => p.id === offer.freeProductId);

      if (freeProduct) {
        const existingFreeItem = newFreeItems.find(i => i.product.id === freeProduct.id);

        if (existingFreeItem) {
          existingFreeItem.quantity += freeItemsCount;
        } else {
          newFreeItems.push({
            product: freeProduct,
            quantity: freeItemsCount,
            isFree: true
          });
        }
      }
    }
  });

  const finalCart = [...regularItems, ...newFreeItems];
  console.log('Final cart after applying offers:', finalCart);
  return finalCart;
};


// Calculate total discount from applied offers
export const calculateDiscount = (cartItems: CartItem[]): number => {
  const discount = cartItems
    .filter(item => item.isFree)
    .reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  console.log('Calculated discount:', discount);
  return discount;
};