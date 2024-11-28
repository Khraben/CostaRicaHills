import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { getToursAll } from "../config/backendServices";
import { useTranslation } from "react-i18next";

const SearchTours = () => {
  const [search, setSearch] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [Tours, setAllTours] = useState([]);
  const { i18n } = useTranslation("global");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getToursAll();
        setAllTours(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const fetchFilteredTours = async () => {
      try {
        const filtered = Tours.filter((tour) => {
          const matchesSearch = tour.nombre
            .toLowerCase()
            .includes(search.toLowerCase());
          const price = parseFloat(tour.precio);
          const matchesMinPrice = minPriceFilter
            ? price >= parseFloat(minPriceFilter)
            : true;
          const matchesMaxPrice = maxPriceFilter
            ? price <= parseFloat(maxPriceFilter)
            : true;
          const matchesDestination = tour.destino.some((d) =>
            d.toLowerCase().includes(destinationFilter.toLowerCase())
          );
          return (
            matchesSearch &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesDestination
          );
        });
        setFilteredTours(filtered);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilteredTours();
  }, [search, minPriceFilter, maxPriceFilter, destinationFilter, Tours]);

  return (
    <Container>
      <FilterContainer>
        <SearchBar>
          <input
            type="text"
            placeholder={i18n.t("placeholderInput")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBar>
        <Filters>
          <input
            type="number"
            placeholder={i18n.t("placeholderInputPrice")}
            value={minPriceFilter}
            onChange={(e) => setMinPriceFilter(e.target.value)}
          />
          <input
            type="number"
            placeholder={i18n.t("placeholderInputPriceTours")}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder={i18n.t("placeholderInputDestination")}
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
          />
        </Filters>
      </FilterContainer>
      <ToursContainer>
        {filteredTours.map((tour, index) => (
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
      </ToursContainer>
    </Container>
  );
};

export default SearchTours;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 20px;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 0.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    input {
      margin: 0.5rem 0;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 20px;
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
    input {
      width: 100%;
    }
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ToursContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;
