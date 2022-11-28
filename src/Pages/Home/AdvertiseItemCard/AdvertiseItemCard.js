import React from 'react';
import { Card } from 'react-bootstrap';
import './AdvertiseItemCard.css';

const AdvertiseItemCard = ({ advertiseItem }) => {
  const { name, image, resalePrice } = advertiseItem;

  return (
    <div>
      <Card className="advertise-card border-0 shadow p-2 h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-4">
          <Card.Title style={{ fontSize: '18px' }}>{name}</Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className="fw-bold">{resalePrice} TK</span>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdvertiseItemCard;
