import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './MyProductCard.css';

const MyProductCard = ({ product, refetch }) => {
  const { _id, name, image, salesStatus, resalePrice, isAdvertise } = product;
  // console.log(product);

  const handleAdvertisedProduct = (id) => {
    fetch(`http://localhost:5000/seller/products/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.info('Product advertising completed');
          refetch();
        }
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/seller/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.info('Product Deleted Successfully');
          refetch();
        }
      });
  };

  return (
    <div>
      <Card className="my-product-card border-0 shadow p-2 h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-0">
          <Card.Title style={{ fontSize: '18px' }}>{name}</Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className="text-success fw-bold">{resalePrice} TK</span>
          </p>
          <p className="card-text mb-1">
            <strong>Status:</strong>&nbsp;
            <span className="text-success fw-bold">{salesStatus}</span>
          </p>
          <div className="d-flex gap-3">
            {salesStatus === 'available' && (
              <Button
                onClick={() => handleAdvertisedProduct(_id)}
                className="mt-3 "
                variant="primary"
                disabled={isAdvertise ? true : false}
              >
                {isAdvertise ? 'Advertised' : 'Advertise'}
              </Button>
            )}
            <Button
              onClick={() => handleDeleteProduct(_id)}
              className="mt-3"
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyProductCard;
