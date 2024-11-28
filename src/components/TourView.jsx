import React,{ useContext, useState,useEffect} from 'react';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { addReservation } from '../config/backendServices';
import {UserContext} from '../context/UserContext';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '../context/ThemeContext';

const TourView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { tour } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [people, setPeople] = useState(1);
    const [tourDate, setTourDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const { isDarkTheme } = useTheme();
    if (!tour) {
        return <div>No se encontró información del tour.</div>;
    }
    const images = Array.isArray(tour.images) ? tour.images : [tour.images];
    const handleReservationClick = async () => {
        setIsModalOpen(true);
    };
    const handleConfirm = async () => {
        try {
            await addReservation(tour.id, user.uid,tourDate, endDate,people,"activo");
            alert('Reserva realizada con éxito.');
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            alert('Hubo un problema al realizar la reserva.');
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Función para calcular la fecha de fin
    const calculateEndDate = (date) => {
        const durationMatch = tour.duration.match(/(\d+)\s*(días|dias|día|dia|day|days|horas|hrs)/i);
        const durationNumber = durationMatch ? parseInt(durationMatch[1], 10) : 1;
        const durationUnit = durationMatch ? durationMatch[2].toLowerCase() : 'horas';

        // Verificar si la duración está en días
        const isDayDuration = /(dia|dias|día|días|day|days)/i.test(durationUnit);
        if (isDayDuration) {
            const calculatedEnd = new Date(date);
            calculatedEnd.setDate(calculatedEnd.getDate() + durationNumber - 1);
            return calculatedEnd;
        } else {
            return null;
        }
    };

    // useEffect para calcular endDate cuando el modal se abre
    useEffect(() => {
        if (isModalOpen) {
            const initialDate = new Date();
            setTourDate(initialDate);
            const initialEndDate = calculateEndDate(initialDate);
            setEndDate(initialEndDate);
        }
    }, [isModalOpen]);
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
                    <button id="ReservarTour-button" onClick={handleReservationClick}>Reservar Tour</button>
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

            <StyledModal
                isOpen={isModalOpen}
                onRequestClose={handleCancel}
                isDarkTheme={isDarkTheme}
                contentLabel="Reserva de Tour"
            >
                <ModalHeader isDarkTheme={isDarkTheme}>
                    <h2>Reserva de Tour</h2>
                    <button onClick={handleCancel}>&times;</button>
                </ModalHeader>
                <ModalContent isDarkTheme={isDarkTheme}>
                    <label>
                        Cantidad de personas:
                        <input
                            type="number"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            min="1"
                        />
                    </label>
                    <label>
                        Fecha del tour:
                        <DatePicker
                           selected={tourDate}
                           onChange={(date) => {
                            setTourDate(date);
                            const newEndDate = calculateEndDate(date);
                            setEndDate(newEndDate);
                        }}
                           dateFormat="dd/MM/yyyy"
                           minDate={new Date()}
                       />
                    </label>
                    {endDate && (
                        <p>Fecha de fin: {endDate.toLocaleDateString()}</p>
                    )}
                </ModalContent>
                <ModalFooter>
                    <button className="cancel" onClick={handleCancel}>Cancelar</button>
                    <button className="confirm" onClick={handleConfirm}>Confirmar</button>
                </ModalFooter>
            </StyledModal>
        </TourDetails>
    );
};

export default TourView;
const StyledModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${({ isDarkTheme }) => (isDarkTheme ? '#333' : '#ffffff')};
    color: ${({ isDarkTheme }) => (isDarkTheme ? '#f9f9f9' : '#333')};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    max-width: 500px;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 9999;
    @media (min-width: 768px) {
        width: 400px;
    }
`;
const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;

    h2 {
        margin: 0;
        font-size: 1.5rem;
        color: ${({ isDarkTheme }) => (isDarkTheme ? '#f9f9f9' : '#333')};
    }

    button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;

        &:hover {
            color: #666;
        }
    }
`;
const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
        font-size: 1rem;
       color: ${({ isDarkTheme }) => (isDarkTheme ? '#ddd' : '#444')};
    }

    input, .react-datepicker-wrapper {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid ${({ isDarkTheme }) => (isDarkTheme ? '#555' : '#ccc')};
        border-radius: 0.5rem;
        background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#333' : '#f9f9f9')};
        color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')}; /* Color de texto */
        box-sizing: border-box;
        &::placeholder {
            color: ${({ isDarkTheme }) => (isDarkTheme ? '#bbb' : '#888')}; /* Color del placeholder */
        }
        &:focus {
            border-color: ${({ isDarkTheme }) => (isDarkTheme ? '#afdb11' : '#759600')};
            outline: none;
        }
    }
`;
const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            transform: translateY(-2px);
        }
    }

    .confirm {
        background-color: #afdb11;
        color: white;
        border: none;

        &:hover {
            background-color: #759600;
        }
    }

    .cancel {
        background-color: #eaeaea;
        color: #333;
        border: none;

        &:hover {
            background-color: #d4d4d4;
        }
    }
`;
const TourDetails = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden; /* Prevent horizontal overflow */
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