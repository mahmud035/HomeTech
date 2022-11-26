import React from 'react';
import './AllSellersCard.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const AllSellersCard = ({ seller, refetch }) => {
  const { _id, name, image, email } = seller;

  const handleDeleteSeller = (id) => {
    fetch(`http://localhost:5000/sellers/${id}`, {
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
    </div>
  );
};

export default AllSellersCard;
