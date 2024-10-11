import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AdvertiseItemCard from '../AdvertiseItemCard/AdvertiseItemCard';
import './AdvertiseItems.css';

const AdvertiseItems = () => {
  const url = 'https://hometech-server-side.vercel.app/advertiseitems';

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
    <div className="advertise-section ">
      <section>
        {advertiseItems.length > 0 && (
          <div className="container py-5">
            <div className="text-center ">
              <h2 className="fw-bold">
                Latest
                <span style={{ color: 'aqua' }}>Promotions</span>
              </h2>
              <p>
                Checkout the latest & upcoming promotions and offers at HomeTech
              </p>
            </div>

            <div className="advertise-items-card-container py-5">
              {advertiseItems.map((advertiseItem) => (
                <AdvertiseItemCard
                  key={advertiseItem._id}
                  advertiseItem={advertiseItem}
                ></AdvertiseItemCard>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdvertiseItems;
