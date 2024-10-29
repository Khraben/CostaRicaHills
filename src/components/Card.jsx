// Card.jsx
import React from 'react';
import '../styles/CardReact.css'; // Asegúrate de crear un archivo CSS separado para los estilos

const Card = ({ title, image, destination, duration, price, description, link }) => {
  return (
    <li className="link-card">
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
    </li>
  );
};

export default Card;