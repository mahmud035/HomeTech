import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Category.css';

const Category = () => {
  const url = 'https://hometech-server-side.vercel.app/categories';
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
    return <Loading></Loading>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // console.log(categories);

  return (
    <div className="category-section pt-3 pb-5">
      <div className="container">
        <div className="text-center py-5">
          <h2 className="fw-bold">
            Featured <span style={{ color: 'aqua' }}>Category</span>
          </h2>
          <p>Get Your Desired Product from Featured Category!</p>
        </div>

        <div className="category-card-container pb-5">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category}></CategoryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
