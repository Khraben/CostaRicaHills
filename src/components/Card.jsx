// Card.jsx
import React from 'react';
import styled from 'styled-components';

const Card = ({ title, image, destination, duration, price, description, link }) => {
    return (
        <CardContainer>
            <CardLink href={link}>
                <ImageSection style={{ backgroundImage: `url(${image})` }}>
                    <Content>
                        <h2>{title}<span>&rarr;</span></h2>
                        <Details>
                          <DetailItem><strong>Destino:</strong> {destination}</DetailItem>
                          <DetailItem><strong>Duración:</strong> {duration}</DetailItem>
                          <DetailItem><strong>Precio:</strong> {price}</DetailItem>
                        </Details>
                    </Content>
                </ImageSection>
                <Description>
                    <p>{description}</p>
                </Description>
            </CardLink>
        </CardContainer>
    );
};

export default Card;

const CardContainer = styled.div`
    border: 2px solid #ccc; /* Añade un borde a la tarjeta */
    border-radius: 8px; /* Opcional: añade bordes redondeados */
    overflow: hidden; /* Asegura que el contenido no se desborde */
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    &:hover h2 {
        color: #00a08b;
    }
`;

const CardLink = styled.a`
    text-decoration: none;
    color: inherit;
    display: block;
`;

const ImageSection = styled.div`
    background-size: cover;
    background-position: center;
    height: 200px;
    position: relative;
`;

const Content = styled.div`
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 1rem;
    color: white;

    h2 {
        margin: 0;
        font-size: 2rem;
        transition: color 0.3s ease;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
`;

const Details = styled.div`
    margin-bottom: 1rem;
`;
const DetailItem = styled.p`
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: #f0f0f0;

    strong {
        color: #ffcc00;
    }
`;
const Description = styled.div`
    padding: 1.5rem;
    background: #f9f9f9; /* color de fondo */
    color: #333; /* color del texto */
    border-top: 1px solid #ccc; /* Añade un borde superior */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Añade una sombra interna */
    border-radius: 0 0 8px 8px; /* Añade bordes redondeados en la parte inferior */
    width: 100%;
    p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
    }
`;