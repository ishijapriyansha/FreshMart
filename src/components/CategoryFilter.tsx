import React from 'react';
import useProductStore from '../store/useProductStore';

const categories = [
  { id: 'all', name: 'All items' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'fruit', name: 'Fruit' },
  { id: 'bakery', name: 'Bakery' }
];

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setCategory } = useProductStore();
  
  return (
    <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setCategory(category.id)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;