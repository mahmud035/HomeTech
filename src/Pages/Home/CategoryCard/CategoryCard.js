import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const { user } = useContext(AuthContext);
  const { categoryName, categoryId, image } = category;

  return (
    <div>
      <Link
        onClick={() => {
          if (!user) {
            toast.info('Please login to see all products');
          }
        }}
        to={`/category/${categoryId}`}
        className="text-decoration-none text-black"
      >
        <Card className="category-card border-0 shadow-sm ">
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{categoryName}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CategoryCard;
