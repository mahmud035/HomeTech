import React from 'react';
import './AllBuyersCard.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

const AllBuyersCard = ({ buyer }) => {
  const { name, image, email } = buyer;
  console.log(buyer);
  return (
    <div>
      <div className="seller-card shadow position-relative">
        <div className="d-flex gap-3">
          {image ? (
            <img src={image} className="card-image" alt="" />
          ) : (
            <FaUserCircle size={65} />
          )}

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

        <RiDeleteBin2Fill size={20} className="delete-icon" />
      </div>
    </div>
  );
};

export default AllBuyersCard;
