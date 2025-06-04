import React from 'react';
import ProductCard from './ProductCard';
import useProductStore from '../store/useProductStore';
import { ShoppingBasket } from 'lucide-react';

const ProductGrid: React.FC = () => {
  const { filteredProducts, isLoading, error } = useProductStore();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-red-500 mb-2">Something went wrong</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <ShoppingBasket size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;