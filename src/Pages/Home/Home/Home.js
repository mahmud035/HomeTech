import React, { useEffect } from 'react';
import useSetTitle from '../../../hooks/useSetTitle';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FaqComponent from '../FAQ/FAQ';
import TopBrands from '../TopBrands/TopBrands';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useSetTitle('Home');

  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <AdvertiseItems></AdvertiseItems>
      <TopBrands></TopBrands>
      <FaqComponent />
    </div>
  );
};

export default Home;
