import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <Banner></Banner>
      <Category></Category>
    </div>
  );
};

export default Home;
