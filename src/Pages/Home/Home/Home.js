import React, { useEffect } from 'react';
import useSetTitle from '../../../hooks/useSetTitle';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FAQ from '../FAQ/FAQ';
import TopBrands from '../TopBrands/TopBrands';
import './Home.css';

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
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
