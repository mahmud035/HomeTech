import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './MyProductCard.css';

const MyProductCard = ({ product, refetch }) => {
  const { _id, name, image, salesStatus, resalePrice, isAdvertise } = product;

  const handleAdvertisedProduct = (id) => {
    fetch(`https://hometech-server-side.vercel.app/seller/products/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken2')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.info('Product advertising completed');
          refetch();
        }
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`https://hometech-server-side.vercel.app/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.info('Product Deleted Successfully');
          refetch();
        }
      });
  };

  return (
    <div>
      <Card className="my-product-card border-0 shadow h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pt-4">
          <Card.Title style={{ fontSize: '18px' }}>{name}</Card.Title>
          <p className="card-text mb-1">
            <strong>Price:</strong>&nbsp;
            <span className=" fw-bold">{resalePrice} TK</span>
          </p>
          <p className="card-text mb-1">
            <strong>Status:</strong>&nbsp;
            <span className=" fw-bold">{salesStatus}</span>
          </p>
          <div className="d-flex gap-3">
            {salesStatus === 'available' && (
              <Button
                onClick={() => handleAdvertisedProduct(_id)}
                className="mt-3 btn-register fw-semibold"
                variant="primary"
                disabled={isAdvertise ? true : false}
              >
                {isAdvertise ? 'Advertised' : 'Advertise'}
              </Button>
            )}
            <Button
              onClick={() => handleDeleteProduct(_id)}
              className="mt-3 btn-log-out fw-semibold"
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
