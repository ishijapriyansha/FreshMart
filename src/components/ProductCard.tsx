import React from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import useCartStore from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartStore();
  
  // Find this product in cart
  const cartItem = cartItems.find(item => item.product.id === product.id && !item.isFree);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  // Format price with currency symbol
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(product.price);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative p-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-contain rounded-lg"
        />
        
        {/* Stock badge */}
        <div className="absolute top-6 right-6">
          {product.stock >= 10 ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Available
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {product.stock} left
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold">{formattedPrice}</p>
          
          {/* Favorite button */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Heart size={20} className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        {quantity > 0 ? (
          <div className="flex items-center justify-between">
            <button 
              onClick={() => removeFromCart(product.id)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            
            <span className="text-gray-800 font-medium">{quantity}</span>
            
            <button 
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center justify-center w-full py-2 px-4 rounded-full ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 transition-colors'
            } text-white font-medium`}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;