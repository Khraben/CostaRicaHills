// UserProfile.jsx
import React, { useState, useEffect,useContext } from 'react';
import Card from './Card.jsx';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import {logoutUser } from './AuthServices';
import { useNavigate } from 'react-router-dom';
import { getTourbyId,getReservationbyUser,deletedReservation } from '../config/backendServices';
import { useTranslation } from 'react-i18next';
const UserProfileReservas = () => {
  const [reservasList, setReservasList] = useState([]);
  const { user, userPhoto } = useContext(UserContext);
  const { i18n } = useTranslation("global");
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
                const reservations = await getReservationbyUser(user.uid);
                const toursReservations = await Promise.all(reservations.map(async (reservation) => {
                    const tour = await getTourbyId(reservation.tour_id);
                    return { ...tour, reservationId: reservation.id };
                    }));
                setReservasList(toursReservations);  
         }catch (error) {
             console.log('Error al obtener las reservas:', error);
            }
        }  
    };
    fetchReservations();
  },[user]);

  const handleDeleteReservation = async (reservationId) => {
    const response = await deletedReservation(reservationId);
    if (response.message) {
       alert(response.message);
    } else if (response.error) {
      alert(response.error);
       
    }
  };  
  return (
    <div>
    <UserProfileSection>
      <UserProfileContainer>
        <UserProfile>
          <h1>{i18n.t("user_profile")}</h1>
          <ProfilePhoto src={userPhoto} alt="Foto de Usuario" />
          <UserName>{i18n.t("name_profile")}: {user.displayName}</UserName>
          <p className="user-email">{i18n.t("welcome_profile")}</p>
          <Button onClick={handleLogout}>{i18n.t("logout_profile")}</Button>
        </UserProfile>
      </UserProfileContainer>
    </UserProfileSection>
    <UserReservas>
      <h2>{i18n.t("reservation_profile")}</h2>
      <ReservasList>
        {reservasList.length > 0 ? (
          reservasList.map((tour, index) => (
            <><Card
                key={index}
                id={tour.id}
                title={tour.nombre}
                images={tour.imagenes}
                destination={tour.destino.join(', ')}
                duration={tour.duracion}
                price={`$${tour.precio}`}
                description={tour.descripcion}
              />
              <ButtonDelete onClick={() => handleDeleteReservation(tour.reservationId)}>{i18n.t("buttonDeleteReservation")} </ButtonDelete> </>
          ))
        ) : (
          <Paragraph>{i18n.t("no_reservations")}</Paragraph>
        )}
      </ReservasList>
    </UserReservas>
    <UserReservas>
    <h2>{i18n.t("history_profile")}</h2>
      <ReservasList>
      {reservasList.length > 0 ? (
          reservasList.map((tour, index) => (
            <Card 
              key={index}
              id={tour.id}
              title={tour.nombre}
              images={tour.imagenes}
              destination={tour.destino.join(', ')}
              duration={tour.duracion}
              price={`$${tour.precio}`}
              description={tour.descripcion}
            />
          ))
        ) : (
          <Paragraph>{i18n.t("no_history")}</Paragraph>
        )}
      </ReservasList>
    </UserReservas>
    </div>
  );
};

export default UserProfileReservas;
const ButtonDelete = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #d9363e;
  }
`;
const Button = styled.button`
  background-color: #afdb11;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #759600;
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
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  h1{
    color: #afdb11;
  }

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
  border: 4px solid #afdb11;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;
const UserName = styled.p`
  margin: 1rem 0;
  color: #fff;
  font-size: 1.75rem;
  font-weight: bold;
`;
const UserReservas = styled.div`
  margin-top: 2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  h2 {
    font-size: 2rem;
    color: #afdb11;
    text-align: center;
  }
`;
const ReservasList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 1.2rem;
`;