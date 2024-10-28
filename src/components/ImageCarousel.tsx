import React, { useState } from 'react';
import '../styles/ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-btn prev">❮</button>
      <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} className="carousel-image" />
      <button onClick={nextSlide} className="carousel-btn next">❯</button>
    </div>
  );
};

export default ImageCarousel;
