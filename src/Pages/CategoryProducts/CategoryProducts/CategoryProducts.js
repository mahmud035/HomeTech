import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useSetTitle from '../../../hooks/useSetTitle';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const [product, setProduct] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const categoryProducts = useLoaderData();
  useSetTitle('Category Products');
  console.log(categoryProducts);

  return (
    <div className="category-products-page">
      <section className="container">
        <h2 className="text-center py-5">
          Category <span style={{ color: 'aqua' }}>Products</span>
        </h2>

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
    </div>
  );
};

export default CategoryProducts;
