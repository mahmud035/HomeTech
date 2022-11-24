import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const { categoryName, categoryId, image } = category;

  return (
    <div>
      <Link
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
