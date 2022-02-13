import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'



const HomePageNews = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://www.clinicadentaldramartanieto.es/wp-content/uploads/2018/03/porque-hay-que-ir-al-dentista-1200x600.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://clinicalikedental.com/wp-content/uploads/2019/02/dentista-infantil-cerca-de-brunete-doctora-1200x600.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://clinicalikedental.com/wp-content/uploads/2019/12/dentista-majadahonda-paciente-e1577717880723-1200x600.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePageNews;