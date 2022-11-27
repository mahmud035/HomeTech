import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = ({ product }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const { _id, resalePrice, userName, userEmail } = product;

  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
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
      fetch('http://localhost:5000/payments', {
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
          }
        });
    }

    //  Changing the state of the `processing` variable to `false`
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>

      <p className="text-danger pt-3">{cardError}</p>
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
