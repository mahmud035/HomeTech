import { useQuery } from '@tanstack/react-query';
import './AllBuyer.css';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AllBuyersCard from '../AllBuyersCard/AllBuyersCard';
import useSetTitle from '../../../hooks/useSetTitle';

const AllBuyers = () => {
  useSetTitle('All Buyers');

  const url = 'https://hometech-server-side.vercel.app/buyers';

  const {
    isLoading,
    isError,
    data: buyers = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['buyers'],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken2')}`,
        },
      });
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
      <h1 className="text-center pb-3">
        All <span style={{ color: 'aqua' }}>Buyers</span>
      </h1>

      <div className="all-buyers-card-container">
        {buyers.map((buyer, index) => (
          <AllBuyersCard
            key={index}
            buyer={buyer}
            refetch={refetch}
          ></AllBuyersCard>
        ))}
      </div>
    </div>
  );
};

export default AllBuyers;
