import React from 'react';
import './AllBuyersCard.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AllBuyersCard = ({ buyer, refetch }) => {
  const { _id, name, image, email } = buyer;

  const handleDeleteBuyer = (id) => {
    fetch(`https://hometech-server-side.vercel.app/buyers/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`Buyer ${name.toUpperCase()} deleted successfully`);
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="buyer-card shadow position-relative">
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

        <RiDeleteBin2Fill
          onClick={() => handleDeleteBuyer(_id)}
          size={20}
          className="delete-icon"
        />
      </div>
    </div>
  );
};

export default AllBuyersCard;
