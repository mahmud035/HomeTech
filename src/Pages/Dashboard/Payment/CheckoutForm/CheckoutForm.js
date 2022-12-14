import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = ({ product }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const { _id, resalePrice, userName, userEmail, productName } = product;
  console.log(product);

  useEffect(() => {
    fetch('https://hometech-server-side.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken2')}`,
      },
      body: JSON.stringify({ resalePrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [resalePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      // console.log(error);
      setCardError(error.message);
    } else {
      setCardError('');
    }

    setSuccess(''); // reset state defaultValue
    setProcessing(true); // change state defaultValue

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    console.log('paymentIntent', paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      // console.log('card info', card);

      const payment = {
        resalePrice,
        transactionId: paymentIntent.id,
        userEmail,
        bookingId: _id,
      };

      //* store payment info in the database
      fetch('https://hometech-server-side.vercel.app/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setSuccess('Congrats! your payment is completed');
            setTransactionId(paymentIntent.id);
            toast.success('Congrats! your payment is completed');

            fetch(
              `https://hometech-server-side.vercel.app/products/salesstatus/${productName}`,
              {
                method: 'PUT',
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });

            // navigate('/dashboard');
          }
        });
    }

    //  Changing the state of the `processing` variable to `false`
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout-form">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': {
                  color: '#fff',
                },
              },
              invalid: {
                color: 'aqua',
              },
            },
          }}
        />

        <button
          className="btn btn-sm mt-4 btn-register fw-semibold text-white"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay Now
        </button>
      </form>
      <p className="text-danger text-center pt-2 " style={{ color: 'aqua' }}>
        {cardError}
      </p>

      {/* {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )} */}
    </>
  );
};

export default CheckoutForm;
