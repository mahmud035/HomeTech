import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import ReportedItemCard from '../ReportedItemCard/ReportedItemCard';
import './ReportedItems.css';

const ReportedItems = () => {
  const url = 'http://localhost:5000/reporteditems';

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
      <h1 className="text-center pb-3">Reported Items</h1>

      <div className="reported-items-card-container">
        {reporteditems.map((reporteditem, index) => (
          <ReportedItemCard
            key={index}
            reporteditem={reporteditem}
            refetch={refetch}
          ></ReportedItemCard>
        ))}
      </div>
    </div>
  );
};

export default ReportedItems;
