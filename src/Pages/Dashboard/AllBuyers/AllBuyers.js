import { useQuery } from '@tanstack/react-query';
import './AllSellers.css';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AllBuyersCard from '../AllBuyersCard/AllBuyersCard';

const AllBuyers = () => {
  const url = 'http://localhost:5000/buyers';

  const {
    isLoading,
    isError,
    data: buyers = [],
    error,
  } = useQuery({
    queryKey: ['buyers'],
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
      <h1 className="text-center pb-3">All Buyers</h1>

      <div className="all-sellers-card-container">
        {buyers.map((buyer, index) => (
          <AllBuyersCard key={index} buyer={buyer}></AllBuyersCard>
        ))}
      </div>
    </div>
  );
};

export default AllBuyers;
