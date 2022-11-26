import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './OrderProductCard.css';

const OrderProductCard = ({ order }) => {
  const { image, productName, resalePrice } = order;

  return (
    <div>
      <Card className="order-product-card border-0 shadow p-2 h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-0">
          <Card.Title>{productName}</Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className="text-success fw-bold">{resalePrice} TK</span>
          </p>
          <Button className="mt-3" variant="primary">
            Pay
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderProductCard;
