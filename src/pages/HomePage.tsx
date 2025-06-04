import React, { useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import useProductStore from '../store/useProductStore';
import {useCartStore} from '../store/useCartStore';

const HomePage: React.FC = () => {
  const { fetchAllProducts, products } = useProductStore();
  const { setProducts } = useCartStore();
  
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <CategoryFilter />
      
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
        Trending Items
      </h1>
      
      <ProductGrid />
    </div>
  );
};

export default HomePage;