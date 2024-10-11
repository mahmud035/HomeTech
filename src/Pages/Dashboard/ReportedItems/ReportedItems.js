import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSetTitle from '../../../hooks/useSetTitle';
import Loading from '../../Shared/Loading/Loading';
import ReportedItemCard from '../ReportedItemCard/ReportedItemCard';
import './ReportedItems.css';

const ReportedItems = () => {
  useSetTitle('Reported Items');

  const url = 'https://hometech-server-side.vercel.app/reporteditems';

  const {
    isLoading,
    isError,
    data: reporteditems = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['reporteditems'],
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
      <h1 className="text-center pb-3">
        Reported <span style={{ color: 'aqua' }}>Items</span>
      </h1>

      <div>
        {reporteditems.length === 0 ? (
          <h3 className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
            No reported items found.
          </h3>
        ) : (
          <div className="reported-items-card-container">
            {reporteditems.map((reporteditem) => (
              <ReportedItemCard
                key={reporteditem._id}
                reporteditem={reporteditem}
                refetch={refetch}
              ></ReportedItemCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedItems;
