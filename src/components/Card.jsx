// Card.jsx
import React from 'react';
import styled from 'styled-components';
const Card = ({ title, image, destination, duration, price, description, link }) => {
    return (
      <CardContainer className="link-card">
        <a href={link} className="card-link">
          <div className="image-section" style={{ backgroundImage: `url(${image})` }}>
            <div className="content">
              <h2>{title}<span>&rarr;</span></h2>
              <div className="details">
                <p><strong>Destino:</strong> {destination}</p>
                <p><strong>Duración:</strong> {duration}</p>
                <p><strong>Precio:</strong> {price}</p>
              </div>
            </div>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </a>
      </CardContainer>
    );
  };
export default Card;

const CardContainer = styled.div`
  .details {
    margin-bottom: 1rem;
  }
  .description {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.8);
    color: black;
    width: 100%;
  }
  .link-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
  .link-card:hover .content h2 {
    color: #00a08b;
  }
  h2 {
    margin: 0;
    font-size: 2rem;
    transition: color 0.3s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-size: 1.2rem;
  }
`;