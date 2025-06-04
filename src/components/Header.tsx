import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import useProductStore from '../store/useProductStore';
import {useCartStore} from '../store/useCartStore';

const Header: React.FC = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const { setSearchQuery } = useProductStore();
  const { cartItems } = useCartStore();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = 2; // Placeholder for demonstration
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };
  
  return (
    <header className="py-4 px-4 md:px-6 bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            GROCERIES
          </Link>
          
          <form 
            onSubmit={handleSearch}
            className="flex-grow max-w-md mx-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
          
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2">
              <Heart size={22} className="text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link to="/account" className="p-2">
              <User size={22} className="text-gray-600" />
            </Link>
            
            <Link to="/checkout" className="relative p-2">
              <ShoppingCart size={22} className="text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;