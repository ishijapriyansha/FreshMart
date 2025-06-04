import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import useProductStore from './store/useProductStore';
import {useCartStore} from './store/useCartStore';

function App() {
  const { fetchAllProducts, products } = useProductStore();
  const { setProducts } = useCartStore();
  
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;