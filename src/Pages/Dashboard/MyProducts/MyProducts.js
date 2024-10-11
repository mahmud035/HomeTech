import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useSetTitle from '../../../hooks/useSetTitle';
import Loading from '../../Shared/Loading/Loading';
import MyProductCard from '../MyProductCard/MyProductCard';
import './MyProducts.css';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useSetTitle('My Products');

  const url = `https://hometech-server-side.vercel.app/products/seller?email=${user?.email}`;

  const {
    isLoading,
    isError,
    data: products = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', user?.email],
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

  return (
    <div className="py-4 ">
      <h1 className="text-center pb-3">
        My <span style={{ color: 'aqua' }}>Products</span>
      </h1>

      <div>
        {products.length === 0 ? (
          <h3 className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
            Oops! You haven't add any product!!
            <Link to="/dashboard/addproduct">
              <Button
                variant="info"
                className="btn-register text-white fw-semibold"
              >
                Add New Product
              </Button>
            </Link>
          </h3>
        ) : (
          <div className="my-product-card-container pb-5">
            {products.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                refetch={refetch}
              ></MyProductCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
