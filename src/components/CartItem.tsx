import React from 'react';
import { Plus, Minus, Trash2, Gift } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import {useCartStore} from '../store/useCartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity, isFree } = item;
  const { updateQuantity, removeFromCart } = useCartStore();
  
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(product.price);
  
  const formattedItemTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(product.price * quantity);
  
  return (
    <div className={`flex items-center p-4 border-b ${isFree ? 'bg-green-50' : ''}`}>
      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              {isFree && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  <Gift size={12} className="mr-1" />
                  Free
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">Product code: {product.id}</p>
          </div>
          
          <div className="text-right">
            {!isFree && (
              <p className="text-sm font-medium text-gray-900">{formattedItemTotal}</p>
            )}
            <p className="text-xs text-gray-500">{formattedPrice} each</p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          {isFree ? (
            <span className="text-sm text-green-600">
              Free item from offer
            </span>
          ) : (
            <div className="flex items-center">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              
              <span className="mx-2 text-gray-800 w-6 text-center">{quantity}</span>
              
              <button 
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          )}
          
          {!isFree && (
            <button 
              onClick={() => removeFromCart(product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;