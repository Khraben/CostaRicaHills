// UserProfile.jsx
import React, { useState, useEffect,useContext } from 'react';
import Card from './Card.jsx';
import prueba from './prueba.json';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import {logoutUser } from './AuthServices';
import { useNavigate } from 'react-router-dom';

const UserProfileReservas = () => {
  const [reservasList, setReservasList] = useState([]);
  const { user, userPhoto } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      navigate('/');
    }
  };
  useEffect(() => {
    const fetchReservations = async () => {
        if (user) {
            try {
            const reservas =null// await getReservasByUser(user.uid);
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
         }catch (error) {
        console.error('Error al obtener las reservas:', error);
            }
        }  
    };
    fetchReservations();
  }, []);
  return (
    <div>
    <UserProfileSection>
      <UserProfileContainer>
        <UserProfile>
          <h1>Perfil del Usuario</h1>
          <ProfilePhoto src={userPhoto} alt="Foto de Usuario" />
          <UserName>Nombre: {user.displayName}</UserName>
          <p className="user-email">Bienvenido</p>
          <Button onClick={handleLogout}>Cerrar Sesión</Button>
        </UserProfile>
      </UserProfileContainer>
    </UserProfileSection>
    <UserReservas>
      <h2>Mis Reservas</h2>
      <ReservasList>
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
          <Paragraph>No tienes reservas disponibles.</Paragraph>
        )}
      </ReservasList>
    </UserReservas>
    </div>
  );
};

export default UserProfileReservas;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
const UserProfileSection = styled.section`
  padding: 2rem;
  background-color: transparent;
  margin-top: 4rem;
`;

const UserProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfile = styled.div`
  background: linear-gradient(135deg, #f0f0f0, #ffffff);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ProfilePhoto = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #00a08b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const UserName = styled.p`
  margin: 1rem 0;
  color: #333;
  font-size: 1.75rem;
  font-weight: bold;
`;

const UserReservas = styled.div`
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    color: #afdb11;
    text-align: center;
  }
`;

const ReservasList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 1.2rem;
`;