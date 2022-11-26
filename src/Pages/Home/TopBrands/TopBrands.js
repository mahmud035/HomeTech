import React from 'react';
import './TopBrands.css';
import microsoft from '../../../assets/images/brands/microsoft.webp';
import hp from '../../../assets/images/brands/hp.webp';
import asus from '../../../assets/images/brands/asus.webp';
import dell from '../../../assets/images/brands/dell.webp';
import lenovo from '../../../assets/images/brands/Lenovo.webp';
import acer from '../../../assets/images/brands/acer.webp';

const TopBrands = () => {
  return (
    <section className="container pb-3">
      <div className="text-center py-5">
        <h3 className="fw-bold pb-4">Top Brands</h3>

        <div className="brands-container">
          <div>
            <img src={microsoft} alt="" />
          </div>
          <img src={hp} alt="" />
          <img src={asus} alt="" />
          <img src={dell} alt="" />
          <img src={lenovo} alt="" />
          <img src={acer} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
