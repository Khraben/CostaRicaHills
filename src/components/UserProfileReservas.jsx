// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { getReservasByUser } from '../../config/firebaseServices.js';
import prueba from './prueba.json';
import '../styles/UserProfileReservas.css';

const UserProfileReservas = () => {
  const [reservasList, setReservasList] = useState([]);
  const fetchReservations = async (userId) => {
    try {
      const reservas = await getReservasByUser(userId);
      const newReservasList = [];
      reservas.forEach(reserva => {
        const tour = prueba["nombre"] === reserva.tourId;
        if (tour) {
          newReservasList.push({
            image: prueba.imagenes[0],
            title: prueba.nombre,
            destination: `${prueba.destino.canton}, ${prueba.destino.provincia}`,
            duration: prueba.duracion,
            price: prueba.precio,
            description: prueba.descripcion,
            link: '#', // Añade el enlace correspondiente aquí
          });
        }
      });
      setReservasList(newReservasList);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchReservations(userId);
    }
  }, []);

  return (
    <div className="user-reservas">
      <h2>Mis Reservas</h2>
      <ul id="reservas-list" className="reservas-list">
        {reservasList.length > 0 ? (
          reservasList.map((tour, index) => (
            <Card 
              key={index}
              image={tour.image}
              title={tour.title}
              destination={tour.destination}
              duration={tour.duration}
              price={tour.price}
              description={tour.description}
              link={tour.link}
            />
          ))
        ) : (
          <p>No tienes reservas disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfileReservas;