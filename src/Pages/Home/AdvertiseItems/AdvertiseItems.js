import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AdvertiseItemCard from '../AdvertiseItemCard/AdvertiseItemCard';
import './AdvertiseItems.css';

const AdvertiseItems = () => {
  const url = 'http://localhost:5000/advertiseitems';

  const {
    isLoading,
    isError,
    data: advertiseItems = [],
    error,
  } = useQuery({
    queryKey: ['advertiseitems'],
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
    <section>
      {advertiseItems.length > 0 && (
        <div className="container py-5">
          <h1 className="text-center">Advertise Items</h1>

          <div className="advertise-items-card-container py-5">
            {advertiseItems.map((advertiseItem, index) => (
              <AdvertiseItemCard
                key={index}
                advertiseItem={advertiseItem}
              ></AdvertiseItemCard>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdvertiseItems;