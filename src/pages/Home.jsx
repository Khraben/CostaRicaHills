import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Home = () => {

    return (
        <div>
            <HeroSection>
                <Overlay />
                <Content>
                    <h1>Bienvenidos a Costa Rica Hills</h1>
                    <p>
                        Nos dedicamos a ofrecer los mejores tours alrededor de Costa Rica.
                        Descubre la belleza natural de nuestro país con nosotros.
                    </p>
                </Content>
            </HeroSection>
            <PopularToursSection>
                <h2>Tours más populares</h2>
                <CardsContainer>
                    <Card
                        title="Tour al Volcán Arenal"
                        description="Explora el majestuoso Volcán Arenal y sus alrededores."
                        image="src/assets/volcan_arenal.jpg"
                        destination="La Fortuna, Alajuela"
                        duration="8 horas"
                        price="$120"
                        link="/toursView?tour=volcan-arenal"
                    />
                    <Card
                        title="Tour a la Playa Manuel Antonio"
                        description="Disfruta de las hermosas playas y la biodiversidad del Parque Nacional Manuel Antonio."
                        image="src/assets/playa_manuel_antonio.jpg"
                        destination="Quepos, Puntarenas"
                        duration="6 horas"
                        price="$90"
                        link="/toursView"
                    />
                </CardsContainer>
            </PopularToursSection>
        </div>
    );
};

export default Home;

const HeroSection = styled.section`
    position: relative;
    height: 60vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.5rem;
    }
`;

const PopularToursSection = styled.section`
    padding: 2rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: white;
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 3.5rem;
    justify-items: center; 
    align-items: start; 
    `;