import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import './Payment.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const product = useLoaderData();
  const { productName, resalePrice } = product;

  return (
    <div className="py-4">
      <h2>Payment for {productName}</h2>
      <h5>
        Please pay <strong>{resalePrice} TK </strong>for the product
      </h5>

      {/* Stripe */}
      <div className="my-5 checkout-form">
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
