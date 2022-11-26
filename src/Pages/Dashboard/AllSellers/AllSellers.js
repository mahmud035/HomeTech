import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AllSellersCard from '../AllSellersCard/AllSellersCard';
import './AllSellers.css';

const AllSellers = () => {
  const url = 'http://localhost:5000/sellers';

  const {
    isLoading,
    isError,
    data: sellers = [],
    error,
  } = useQuery({
    queryKey: ['sellers'],
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
    <div className="py-4">
      <h1 className="text-center pb-3">All Sellers</h1>

      <div className="all-sellers-card-container">
        {sellers.map((seller, index) => (
          <AllSellersCard key={index} seller={seller}></AllSellersCard>
        ))}
      </div>
    </div>
  );
};

export default AllSellers;
