import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Camera, X } from 'lucide-react';

const Card = ({ title, images, destination, duration, price, description }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const tour = { title, images, destination, duration, price, description };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleClick = () => {
    navigate(`/tour-view/`, { state: { tour } });
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageSection>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} - Imagen ${index + 1}`}
            className={`image ${index === currentImage ? 'active' : ''}`}
          />
        ))}
        <Overlay />
        <ImageContent>
          <h2>{title}</h2>
          <Details>
            <DetailItem><MapPin className="icon" />{destination}</DetailItem>
            <DetailItem><Clock className="icon" />{duration}</DetailItem>
            <DetailItem><DollarSign className="icon" />{price}</DetailItem>
          </Details>
        </ImageContent>
        <CameraButton onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}>
          <Camera className="icon" />
        </CameraButton>
      </ImageSection>
      <Description>
        <p>{description}</p>
      </Description>
      {showGallery && (
        <GalleryOverlay className={showGallery ? 'visible' : ''}>
          <CloseButton onClick={() => setShowGallery(false)}>
            <X className="icon" />
          </CloseButton>
          <Gallery>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${title} - Imagen ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </Gallery>
        </GalleryOverlay>
      )}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 200px;

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease;
    opacity: 0;
  }

  .image.active {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ImageContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: white;
  z-index: 1;
  h2 {
    font-size: 2rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Details = styled.div`
  margin-top: 0.5rem;
`;

const DetailItem = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 0.5rem;
  }
`;

const CameraButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 3; /* Aumentar z-index */
  .icon {
    color: white;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Description = styled.div`
  padding: 1rem;
  height: 100px;
  background: #f9f9f9;
  color: #333;
  border-top: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const GalleryOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1005; /* Asegurar que el z-index sea suficientemente alto */
  padding: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1006; /* Asegurar que el z-index sea suficientemente alto */
  .icon {
    color: white;
    width: 2rem;
    height: 2rem;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  width: 100%;
  .gallery-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;