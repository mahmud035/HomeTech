import React from 'react';
import './AllSellersCard.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { MdVerifiedUser } from 'react-icons/md';

const AllSellersCard = ({ seller, refetch }) => {
  const { _id, name, image, email } = seller;

  const handleVerifySeller = (id) => {
    fetch(`https://hometech-server-side.vercel.app/sellers/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Seller ${name} verified successfully`);
          refetch();

          // update Seller verify status in the productsCollection
          fetch(
            `https://hometech-server-side.vercel.app/products/verify/${email}`,
            {
              method: 'PUT',
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }
      });
  };

  const handleDeleteSeller = (id) => {
    fetch(`https://hometech-server-side.vercel.app/sellers/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`Seller ${name} deleted successfully`);
          refetch();
        }
      });
  };

  return (
    <div className="seller-card shadow position-relative">
      <div className="d-flex gap-3">
        <img src={image} className="card-image" alt="" />
        <div>
          <p className="mb-2 d-flex align-items-center">
            <FaUser size={16} className="me-2" />
            <strong>{name.toUpperCase()}</strong>
            {seller?.verified && (
              <p style={{ color: 'blue' }} className="mb-1 ms-1 fw-semibold">
                <MdVerifiedUser size={16} />
              </p>
            )}
          </p>
          <p>
            <MdEmail size={16} className="me-1" /> {email}
          </p>
        </div>
      </div>

      <RiDeleteBin2Fill
        size={20}
        onClick={() => handleDeleteSeller(_id)}
        className="delete-icon"
      />

      <Button
        onClick={() => handleVerifySeller(_id)}
        disabled={seller?.verified ? true : false}
        className="mt-4 "
        variant="primary"
        size="sm"
      >
        {seller?.verified ? 'Verified' : 'Verify Seller'}
      </Button>
    </div>
  );
};

export default AllSellersCard;
