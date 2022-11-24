import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    name,
    image,
    location,
    originalPrice,
    resalePrice,
    yearsOfUse,
    postedTime,
    sellerName,
    verified,
  } = product;

  return (
    <div>
      <h5>Product Card</h5>
    </div>
  );
};

export default ProductCard;
