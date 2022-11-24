import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Category.css';

const Category = () => {
  const url = 'http://localhost:5000/categories';
  const {
    isLoading,
    isError,
    data: categories = [],
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(categories);

  return (
    <div className="container">
      <div className="text-center py-5">
        <h3 className="fw-bold">Featured Category</h3>
        <p>Get Your Desired Product from Featured Category!</p>
      </div>

      <div className="category-card-container pb-5">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
