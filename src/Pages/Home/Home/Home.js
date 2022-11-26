import React, { useEffect } from 'react';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
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
      <AdvertiseItems></AdvertiseItems>
    </div>
  );
};

export default Home;
