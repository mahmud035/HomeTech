import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const categoryProducts = useLoaderData();
  console.log(categoryProducts);

  return (
    <div className="container">
      <h2 className="text-center py-5">All Products</h2>

      <div className="product-card-container pb-5">
        {categoryProducts.map((product, index) => (
          <ProductCard key={index} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
