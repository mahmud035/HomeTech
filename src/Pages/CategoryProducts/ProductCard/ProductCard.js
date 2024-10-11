import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { MdReportProblem, MdVerifiedUser } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import './ProductCard.css';

const ProductCard = ({ product, setProduct, setModalShow }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
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
    fetch(`https://hometech-server-side.vercel.app/products/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success('We have accepted your report');
        }
        if (data.modifiedCount === 0) {
          toast.info('This product is already on the reported list.');
        }
      });
  };

  return (
    <div>
      <div className="category-product-card card mb-3 p-4 border-0 shadow">
        <div className="row g-2">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded h-100" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text mb-1">
                <small className="text-white">
                  Posted on {postedTime}, {location}
                </small>
              </p>
              <p className="card-text mb-1">
                <strong>Resale Price:</strong>&nbsp;
                <span className=" fw-bold">{resalePrice} TK</span>
              </p>
              <p className="card-text mb-1">
                Original Price:&nbsp;
                {originalPrice} TK
              </p>
              <p className="card-text mb-1">Used: {yearsOfUse}</p>
              <div className="d-flex gap-3 align-items-center">
                <p className="card-text mb-1">Seller: {sellerName}</p>
                {verified && (
                  <p
                    style={{
                      color: 'aqua',
                      fontSize: '11.6px',
                    }}
                    className="mb-1 fw-bold"
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
                  className="mt-3 fw-semibold btn-register text-white"
                >
                  Book Now
                </Button>
                <MdReportProblem
                  onClick={() => handleReportItem(_id)}
                  size={30}
                  title="Report this Product"
                  className={`mt-4 ${isAdmin ? 'd-none' : undefined}`}
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
