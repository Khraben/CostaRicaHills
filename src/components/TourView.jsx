import React from 'react';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';
import { useLocation, useNavigate } from 'react-router-dom';

const TourView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tour } = location.state || {};

    if (!tour) {
        return <div>No se encontró información del tour.</div>;
    }

    const images = Array.isArray(tour.images) ? tour.images : [tour.images];

    return (
        <TourDetails>
            <Header>
                <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            </Header>
            <Content>
                <CarouselContainer>
                    <ImageCarousel images={images} alt="Foto del tour" />
                </CarouselContainer>
                <TourInfo>
                    <h1>{tour.title || 'Título no disponible'}</h1>
                    <p><strong>Destino:</strong> {tour.destination || 'Destino no disponible'}</p>
                    <p><strong>Descripción:</strong> {tour.description || 'Descripción no disponible'}</p>
                    <p><strong>Duración:</strong> {tour.duration || 'Duración no disponible'}</p>
                    <p><strong>Precio:</strong> {tour.price || 'Precio no disponible'}</p>
                    <button id="ReservarTour-button" data-tour-nombre={tour.title}>Reservar Tour</button>
                </TourInfo>
            </Content>
            <ReviewsSection>
                <h2>Reseñas</h2>
                <Review>
                    <Stars>⭐⭐⭐⭐⭐</Stars>
                    <p>"¡Una experiencia increíble! El tour fue muy bien organizado y los guías fueron muy amables y conocedores."</p>
                    <Author>- Juan Pérez</Author>
                </Review>
                <Review>
                    <Stars>⭐⭐⭐⭐</Stars>
                    <p>"Disfruté mucho del tour, los paisajes eran impresionantes y aprendí mucho sobre la historia local."</p>
                    <Author>- María González</Author>
                </Review>
            </ReviewsSection>
        </TourDetails>
    );
};

export default TourView;

const TourDetails = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 1200px;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
    }
`;

const CarouselContainer = styled.div`
    width: 100%;

    @media (min-width: 768px) {
        width: 60%;
    }
`;

const TourInfo = styled.div`
    width: 100%;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: 0.5rem;

    @media (min-width: 768px) {
        width: 40%;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        color: white;
        background-color: #afdb11;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #759600;
        }
    }
`;

const BackButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #afdb11;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #759600;
        transform: translateY(-2px);
    }
`;

const ReviewsSection = styled.section`
    width: 100%;
    max-width: 1200px;
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    color: white;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
`;

const Review = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;

    p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
`;

const Stars = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const Author = styled.div`
    font-size: 1rem;
    font-style: italic;
    text-align: right;
`;