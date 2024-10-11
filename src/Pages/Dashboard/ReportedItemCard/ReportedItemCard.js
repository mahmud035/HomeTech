import React from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import './ReportedItemCard.css';

const ReportedItemCard = ({ reporteditem, refetch }) => {
  const { _id, name, image } = reporteditem;

  const handleDeleteReportedItem = (id) => {
    fetch(`https://hometech-server-side.vercel.app/reporteditems/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Product ${name.toUpperCase()} deleted successfully`);
          refetch();
        }
      });
  };

  return (
    <div className="report-card shadow position-relative">
      <div className="d-flex gap-3">
        <img src={image} className="card-image" alt="" />
        <div>
          <p className="mb-2 d-flex align-items-center">
            <strong>{name}</strong>
          </p>
        </div>
      </div>

      <RiDeleteBin2Fill
        size={20}
        onClick={() => handleDeleteReportedItem(_id)}
        className="report-item-delete-icon"
      />
    </div>
  );
};

export default ReportedItemCard;
