import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import MyProductCard from '../MyProductCard/MyProductCard';
import './MyProducts.css';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const url = `http://localhost:5000/products/seller?email=${user?.email}`;

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
      <h1 className="text-center pb-3">My Products</h1>

      <div className="my-product-card-container">
        {products.map((product, index) => (
          <MyProductCard
            key={index}
            product={product}
            refetch={refetch}
          ></MyProductCard>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
