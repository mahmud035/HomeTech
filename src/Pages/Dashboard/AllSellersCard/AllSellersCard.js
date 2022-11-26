import React from 'react';
import './AllSellersCard.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';

const AllSellersCard = ({ seller }) => {
  const { name, image, email } = seller;

  const handleSellerDelete = () => {};

  return (
    <div className="seller-card shadow position-relative">
      <div className="d-flex gap-3">
        <img src={image} className="card-image" alt="" />
        <div>
          <p className="mb-2 d-flex align-items-center">
            <FaUser size={16} className="me-2" />
            <strong>{name.toUpperCase()}</strong>
          </p>
          <p>
            <MdEmail size={16} className="me-1" /> {email}
          </p>
        </div>
      </div>

      <RiDeleteBin2Fill
        size={20}
        onClick={handleSellerDelete}
        className="delete-icon"
      />
    </div>
  );
};

export default AllSellersCard;
