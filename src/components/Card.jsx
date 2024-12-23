import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Camera, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { translateText } from "../config/deepl";

const useImageSlider = (images) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length === 0) return; // Prevenir si no hay imágenes

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // 3000 ms = 3 segundos

    return () => clearInterval(timer);
  }, [images.length]);
  return currentImage;
};

const Card = ({
  id,
  title,
  images,
  destination,
  duration,
  price,
  description,
}) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();
  const { i18n } = useTranslation("global");
  const currentImage = useImageSlider(images);
  const [showGallery, setShowGallery] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [translatedTour, setTranslatedTour] = useState({
    title,
    destination,
    duration,
    price,
    description,
  });
  const tour = { id, title, images, destination, duration, price, description };

  useEffect(() => {
    const translateTourInfo = async () => {
      if (i18n.language === "ap") {
        const translatedTitle = await translateText(title, "EN");
        const translatedDestination = await translateText(destination, "EN");
        const translatedDescription = await translateText(description, "EN");
        const translatedDuration = await translateText(duration, "EN");
        const translatedPrice = await translateText(price, "EN");
        setTranslatedTour({
          title: translatedTitle,
          destination: translatedDestination,
          description: translatedDescription,
          duration: translatedDuration,
          price: translatedPrice,
        });
      } else {
        setTranslatedTour({ title, destination, duration, price, description });
      }
    };
    translateTourInfo();
  }, [i18n.language, title, destination, duration, price, description]);

  const openImageModal = useCallback(
    (img) => {
      if (selectedImage !== img) {
        // Solo actualiza si la imagen es diferente
        setSelectedImage(img);
        setShowImageModal(true);
      }
    },
    [selectedImage]
  );
  const closeImageModal = useCallback(() => {
    setShowImageModal(false);
    setSelectedImage("");
  }, []);
  const handleModalClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        closeImageModal();
      }
    },
    [closeImageModal]
  );
  const handleClick = useCallback(() => {
    if (!showGallery) {
      navigate(`/tour-view/`, { state: { tour } });
    }
  }, [
    showGallery,
    navigate,
    id,
    title,
    images,
    destination,
    duration,
    price,
    description,
  ]);
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  const getTruncatedDescription = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <CardContainer isDarkTheme={isDarkTheme} onClick={handleClick}>
      <ImageSection isDarkTheme={isDarkTheme}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${translatedTour.title} - Imagen ${index + 1}`}
            className={`image ${index === currentImage ? "active" : ""}`}
          />
        ))}
        <Overlay isDarkTheme={isDarkTheme} />
        <ImageContent isDarkTheme={isDarkTheme}>
          <Title isDarkTheme={isDarkTheme}>{translatedTour.title}</Title>
          <Details>
            <DetailItem isDarkTheme={isDarkTheme}>
              <MapPin className="icon" />
              {translatedTour.destination}
            </DetailItem>
            <DetailItem isDarkTheme={isDarkTheme}>
              <Clock className="icon" />
              {translatedTour.duration}
            </DetailItem>
            <DetailItem isDarkTheme={isDarkTheme}>
              <DollarSign className="icon" />
              {translatedTour.price}
            </DetailItem>
          </Details>
        </ImageContent>
        <CameraButton
          isDarkTheme={isDarkTheme}
          onClick={(e) => {
            e.stopPropagation();
            setShowGallery(true);
          }}
        >
          <Camera className="icon" />
        </CameraButton>
      </ImageSection>
      <Description isDarkTheme={isDarkTheme}>
        <p>
          {isDescriptionExpanded
            ? translatedTour.description
            : getTruncatedDescription(translatedTour.description, 150)}
        </p>
        {translatedTour.description.length > 200 && (
          <ReadMoreButton
            onClick={(e) => {
              e.stopPropagation();
              toggleDescription();
            }}
            isDarkTheme={isDarkTheme}
          >
            {isDescriptionExpanded ? "Leer menos" : "Leer más"}
          </ReadMoreButton>
        )}
      </Description>
      {showGallery && (
        <GalleryContainer isDarkTheme={isDarkTheme}>
          <Gallery isDarkTheme={isDarkTheme}>
            <CloseButton
              isDarkTheme={isDarkTheme}
              aria-label="Cerrar galería"
              onClick={(e) => {
                e.stopPropagation();
                setShowGallery(false);
              }}
            >
              <X className="icon" />
            </CloseButton>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${translatedTour.title} - Imagen ${index + 1}`}
                className="gallery-image"
                onClick={() => openImageModal(img)}
              />
            ))}
          </Gallery>
        </GalleryContainer>
      )}
      {showImageModal && (
        <ImageModalOverlay isDarkTheme={isDarkTheme} onClick={handleModalClick}>
          <ImageModal>
            <img src={selectedImage} alt="Imagen grande" />
            <CloseModalButton
              isDarkTheme={isDarkTheme}
              onClick={closeImageModal}
            >
              <X className="icon" />
            </CloseModalButton>
          </ImageModal>
        </ImageModalOverlay>
      )}
    </CardContainer>
  );
};

export default Card;
const CardContainer = styled.div`
  background: ${({ isDarkTheme }) => (isDarkTheme ? "#2c2c2c" : "#ffffff")};
  border-radius: 8px;
  box-shadow: ${({ isDarkTheme }) =>
    isDarkTheme
      ? "0 4px 8px rgba(255, 255, 255, 0.1)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)"};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ isDarkTheme }) =>
      isDarkTheme
        ? "0 12px 24px rgba(255, 255, 255, 0.2)"
        : "0 12px 24px rgba(0, 0, 0, 0.2)"};
  }
`;
const ImageSection = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  .image {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease;
    opacity: 0;
    pointer-events: none;
  }
  .image.active {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }

  &:hover img.active {
    filter: brightness(1.2);
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.2)"};
`;

// Agrega el componente estilizado Title
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ isDarkTheme }) => (isDarkTheme ? "#eeeeee" : "#eeeeee")};
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
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
    color: ${({ isDarkTheme }) => (isDarkTheme ? "#FFD700" : "#1f8de1")};
  }
`;
const CameraButton = styled.button`
  position: absolute;
  top: 2.5rem;
  right: 1rem;
  background: ${({ isDarkTheme }) => (isDarkTheme ? "#FFD700" : "#1f8de1")};
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 3;

  .icon {
    color: ${({ isDarkTheme }) => (isDarkTheme ? "#000" : "#eeeeee")};
  }

  &:hover {
    background: ${({ isDarkTheme }) => (isDarkTheme ? "#e6c200" : "#1666b2")};
  }
`;

const Description = styled.div`
  padding: 1rem;
  height: 100px;
  overflow-y: auto;
  background: ${({ isDarkTheme }) => (isDarkTheme ? "#1a1a1a" : "#f9f9f9")};
  color: ${({ isDarkTheme }) => (isDarkTheme ? "#f0f0f0" : "#333333")};
  border-top: 1px solid
    ${({ isDarkTheme }) => (isDarkTheme ? "#333333" : "#cccccc")};
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    font-size: 1rem;
  }
`;
const ReadMoreButton = styled.button`
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: ${({ isDarkTheme }) => (isDarkTheme ? "#FFD700" : "#1f8de1")};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const GalleryContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 300px;
  height: 100%;
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.8)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 1rem;
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
  background: ${({ isDarkTheme }) => (isDarkTheme ? "#333333" : "#ffffff")};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .gallery-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1006;
  .icon {
    color: #ff5252;
    width: 2rem;
    height: 2rem;
  }
  &:hover {
    .icon {
      color: #ff5252;
    }
  }
`;
const ImageModalOverlay = styled.div`
  position: absolute;
  top: -70px;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ImageModal = styled.div`
  max-width: 150%;
  max-height: 150%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const CloseModalButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 30;
  .icon {
    color: #ff5252;
    width: 2rem;
    height: 2rem;
  }
  &:hover {
    .icon {
      color: #ff5252;
    }
  }
`;
