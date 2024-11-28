import React, { useState } from "react";
import styled from "styled-components";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <Carousel>
      <CarouselButton onClick={prevSlide} className="prev">
        ❮
      </CarouselButton>
      <CarouselImage
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
      />
      <CarouselButton onClick={nextSlide} className="next">
        ❯
      </CarouselButton>
    </Carousel>
  );
};

export default ImageCarousel;

const Carousel = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 80vh;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid red;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;
