import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import useCartStore from '../store/useCartStore';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCartStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <CartItem key={`${item.product.id}-${item.isFree ? 'free' : 'regular'}-${index}`} item={item} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link 
                  to="/"
                  className="flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue shopping
                </Link>
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <Link 
              to="/"
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft size={16} className="mr-1" />
              Continue shopping
            </Link>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;