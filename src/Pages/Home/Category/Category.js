import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);

  const url = 'https://hometech-server-side.vercel.app/categories';

  //* Load data Using Axios

  useEffect(() => {
    axios.get(url).then((res) => setCategories(res.data));
  }, []);

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
          {categories.map((category) => (
            <CategoryCard
              key={category.categoryName}
              category={category}
            ></CategoryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
