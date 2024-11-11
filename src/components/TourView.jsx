import React from 'react';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';
import {useLocation } from 'react-router-dom';
const TourView = () => {
    const location = useLocation();
    const { tour } = location.state || {};
    if (!tour) {
        return <div>No se encontró información del tour.</div>;
    }
    const images = Array.isArray(tour.image) ? tour.image : [tour.image];
    return (
        <TourDetails>
            <CarouselContainer>
                <ImageCarousel images={images} alt="Foto del tour" />
            </CarouselContainer>
            <TourInfo>
                <h1>{tour.title}</h1>
                <p><strong>Destino:</strong> {tour.destination}</p>
                <p><strong>Descripción:</strong> {tour.description}</p>
                <p><strong>Duración:</strong> {tour.duration}</p>
                <p><strong>Precio:</strong> {tour.price}</p>
                <button id="ReservarTour-button" data-tour-nombre={tour.title}>Reservar Tour</button>
            </TourInfo>
        </TourDetails>
    );
};

export default TourView;

const TourDetails = styled.section`
    display: flex;
    gap: 2rem;
    padding: 2rem;
`;

const CarouselContainer = styled.div`
    width: 60%;
`;

const TourInfo = styled.div`
    width: 40%;
    color: white;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        font-size: 1.25rem;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3;
        }
    }
`;