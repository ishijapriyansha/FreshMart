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
  let freeItems: CartItem[] = [];

  // First, remove any existing free items
  const regularItems = result.filter(item => !item.isFree);
  console.log('Regular items:', regularItems);

  // Process each offer
  offers.forEach(offer => {
    console.log('Processing offer:', offer);
    
    const triggerItem = regularItems.find(item => item.product.id === offer.triggerProductId);
    console.log('Found trigger item:', triggerItem);
    
    if (triggerItem && triggerItem.quantity >= offer.triggerQuantity) {
      // Calculate how many free items to add
      const freeItemsCount = Math.floor(triggerItem.quantity / offer.triggerQuantity) * offer.freeQuantity;
      console.log('Calculated free items count:', freeItemsCount);
      
      // Find the free product
      const freeProduct = products.find(p => p.id === offer.freeProductId);
      console.log('Found free product:', freeProduct);
      
      if (freeProduct) {
        // Remove any existing free items for this offer
        freeItems = freeItems.filter(item => item.product.id !== offer.freeProductId);
        
        // Add new free items
        freeItems.push({
          product: freeProduct,
          quantity: freeItemsCount,
          isFree: true
        });
        console.log('Added free items:', freeItems);
      }
    }
  });

  const finalCart = [...regularItems, ...freeItems];
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