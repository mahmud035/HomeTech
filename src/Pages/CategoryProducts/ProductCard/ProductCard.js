import React, { useEffect } from 'react';
import './ProductCard.css';
import { MdVerifiedUser } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { MdReportProblem } from 'react-icons/md';
import { toast } from 'react-toastify';

const ProductCard = ({ product, setProduct, setModalShow }) => {
  const {
    _id,
    name,
    image,
    location,
    originalPrice,
    resalePrice,
    yearsOfUse,
    postedTime,
    sellerName,
    verified,
    mobileNumber,
  } = product;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleReportItem = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success('We have accepted your report');
        }
      });
  };

  return (
    <div>
      <div className="card mb-3 p-4 border-0 shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text mb-1">
                <small className="text-muted">
                  Posted on {postedTime}, {location}
                </small>
              </p>
              <p className="card-text mb-1">
                <strong>Resale Price:</strong>&nbsp;
                <span className="text-success fw-bold">{resalePrice} TK</span>
              </p>
              <p className="card-text mb-1">
                Original Price:
                <span className="text-success"> {originalPrice} TK</span>
              </p>
              <p className="card-text mb-1">Used: {yearsOfUse}</p>
              <div className="d-flex gap-3 align-items-center">
                <p className="card-text mb-1">Seller: {sellerName}</p>
                {verified && (
                  <p
                    style={{ color: 'blue', fontSize: '11.6px' }}
                    className="mb-1 fw-semibold"
                  >
                    <MdVerifiedUser size={20} />
                    <small> VERIFIED SELLER</small>
                  </p>
                )}
              </div>
              <p className="card-text mb-1">Contact: {mobileNumber}</p>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  onClick={() => {
                    setProduct(product);
                    setModalShow(true);
                  }}
                  variant="primary"
                  className="mt-3"
                >
                  Book Now
                </Button>
                <MdReportProblem
                  onClick={() => handleReportItem(_id)}
                  size={30}
                  title="Report this Product"
                  className="mt-4"
                  style={{ cursor: 'pointer', color: '#f1236f' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
