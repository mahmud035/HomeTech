import React from 'react';
import './TopBrands.css';
import microsoft from '../../../assets/images/brands/microsoft.webp';
import hp from '../../../assets/images/brands/hp.webp';
import asus from '../../../assets/images/brands/asus.png';
import dell from '../../../assets/images/brands/dell.webp';
import lenovo from '../../../assets/images/brands/Lenovo.webp';
import acer from '../../../assets/images/brands/acer.webp';

const TopBrands = () => {
  return (
    <div className="top-brands-section pt-1 pb-4">
      <section className="container ">
        <div className="text-center py-5">
          <h2 className="fw-bold pb-4">
            Top <span style={{ color: 'aqua' }}>Brands</span>
          </h2>

          <div className="brands-container">
            <div>
              <img src={microsoft} alt="" />
            </div>
            <img src={lenovo} alt="" />
            <img src={acer} alt="" />
            <img src={hp} alt="" />
            <img src={dell} alt="" />
            <img src={asus} alt="" style={{ width: '60px', height: '40px' }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopBrands;
