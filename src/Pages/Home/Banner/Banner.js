import React from 'react';
import './Banner.css';
import Carousel from 'react-bootstrap/Carousel';
import banner from '../../../assets/images/banner.webp';
import banner2 from '../../../assets/images/banner2.png';
import banner3 from '../../../assets/images/banner3.webp';

const Banner = () => {
  return (
    <div className="carousel-container">
      <Carousel fade>
        <Carousel.Item>
          <div className="carousel-img">
            <img className="d-block " src={banner} alt="First slide" />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-img">
            <img className="d-block" src={banner2} alt="Second slide" />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-img">
            <img className="d-block " src={banner3} alt="Third slide" />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
