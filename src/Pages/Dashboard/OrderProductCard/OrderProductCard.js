import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OrderProductCard.css';

const OrderProductCard = ({ order }) => {
  const { _id, image, productName, resalePrice } = order;
  console.log(order);

  return (
    <div>
      <Card className="order-product-card border-0 shadow p-2 h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-4">
          <Card.Title>{productName}</Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className="fw-bold">{resalePrice} TK</span>
          </p>

          {!order?.paid && (
            <Link to={`/dashboard/payment/${_id}`}>
              <Button
                className="mt-3 btn-register fw-semibold"
                variant="primary"
              >
                Pay Now
              </Button>
            </Link>
          )}

          {order?.paid && (
            <Button
              className="mt-3 btn-register fw-semibold"
              variant="primary"
              disabled
            >
              Paid
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderProductCard;
