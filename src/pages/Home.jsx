import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";
import { getToursAll } from "../config/backendServices";

const Home = () => {
  const { i18n } = useTranslation("global");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const allTours = await getToursAll();
        setTours(allTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const getRandomTours = (tours, count) => {
    const shuffled = [...tours].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomTours = getRandomTours(tours, 3);
  console.log(randomTours);
  return (
    <PageContainer>
      <HeroSection>
        <Content>
          <h1>{i18n.t("welcome")}</h1>
          <p>{i18n.t("subTitle")}</p>
        </Content>
      </HeroSection>
      <PopularToursSection>
        <h2>{i18n.t("subTitleTours")}</h2>

        <CardsContainer>
          {randomTours.map((tour, index) => (
            <Card
              key={index}
              id={tour.id}
              title={tour.nombre}
              images={tour.imagenes}
              destination={tour.destino.join(", ")}
              duration={tour.duracion}
              price={`$${tour.precio}`}
              description={tour.descripcion}
            />
          ))}
        </CardsContainer>
      </PopularToursSection>
    </PageContainer>
  );
};

export default Home;

const PageContainer = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.5); /* Fondo con efecto de opacidad */
  color: white;
`;

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem 0; /* Reducir padding */

  h1 {
    color: #afdb11;
  }
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
  position: relative;
  padding: 1rem 0; /* Reducir padding */

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem; /* Reducir gap */
  justify-items: center;
  align-items: start;
`;
