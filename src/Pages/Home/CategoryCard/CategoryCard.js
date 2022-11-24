import React from 'react';
import { Card } from 'react-bootstrap';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const { categoryName, image } = category;

  return (
    <div>
      <Card className="category-card border-0 shadow-sm ">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{categoryName}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryCard;
