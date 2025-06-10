import React from 'react';
import {useCartStore} from '../store/useCartStore';

const OrderSummary: React.FC = () => {
  const { subtotal, discount, total } = useCartStore();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-gray-900">{formatCurrency(subtotal)}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-gray-600">Free Items</p>
          <p className="text-green-600">-{formatCurrency(discount)}</p>
          {/* <span style={{ color: 'green' }}>
          → {item.quantity} coffee(s) added for free</span> */}
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between">
            <p className="font-medium text-gray-900">Total</p>
            <p className="font-medium text-gray-900">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>
      
      <button 
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;