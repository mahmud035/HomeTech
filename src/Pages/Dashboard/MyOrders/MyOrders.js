import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';
import Loading from '../../Shared/Loading/Loading';
import OrderProductCard from '../OrderProductCard/OrderProductCard';
import './MyOrders.css';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  const url = `http://localhost:5000/orders?email=${user?.email}`;

  const {
    isLoading,
    isError,
    data: orders = [],
    error,
  } = useQuery({
    queryKey: ['orders', user?.email],
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
    return <div>{error.message}</div>;
  }

  console.log(orders);
  return (
    <div>
      {!isAdmin && !isSeller && (
        <div className="py-5">
          {/* <h1 className="text-center pb-4">My Orders</h1> */}

          <div className="order-product-card-container">
            {orders.map((order, index) => (
              <OrderProductCard key={index} order={order}></OrderProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
