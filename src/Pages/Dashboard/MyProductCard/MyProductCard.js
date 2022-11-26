import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './MyProductCard.css';

const MyProductCard = ({ product }) => {
  const { image, salesStatus, resalePrice } = product;
  console.log(product);

  return (
    <div>
      <Card className="my-product-card border-0 shadow p-2">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-0">
          <Card.Title></Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className="text-success fw-bold">{resalePrice} TK</span>
          </p>
          <div className="d-flex gap-3">
            <Button className="mt-3 " variant="primary">
              Advertise
            </Button>
            <Button className="mt-3" variant="danger">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyProductCard;
