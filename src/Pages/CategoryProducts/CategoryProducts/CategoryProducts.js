import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const [product, setProduct] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const categoryProducts = useLoaderData();

  return (
    <section className="container">
      <h2 className="text-center py-5">All Products</h2>

      <div className="product-card-container pb-5">
        {categoryProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            setProduct={setProduct}
            setModalShow={setModalShow}
          ></ProductCard>
        ))}
      </div>

      {/* If product is true, then show the Modal */}
      {product && (
        <BookingModal
          show={modalShow}
          product={product}
          setProduct={setProduct}
        ></BookingModal>
      )}
    </section>
  );
};

export default CategoryProducts;
