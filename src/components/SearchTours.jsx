import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { getToursAll } from '../config/backendServices';
const SearchTours = () => {
    const [search, setSearch] = useState('');
    const [filteredTours, setFilteredTours] = useState([]);
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [destinationFilter, setDestinationFilter] = useState('');
    const [Tours, setAllTours] = useState([]);
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
                const filtered = Tours.filter(tour => {
                    const matchesSearch = tour.nombre.toLowerCase().includes(search.toLowerCase());
                    const price = parseFloat(tour.precio);
                    const matchesMinPrice = minPriceFilter ? price >= parseFloat(minPriceFilter) : true;
                    const matchesMaxPrice = maxPriceFilter ? price <= parseFloat(maxPriceFilter) : true;
                    const matchesDestination = tour.destino.some(d => d.toLowerCase().includes(destinationFilter.toLowerCase()));
                    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesDestination;
                });
                setFilteredTours(filtered);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFilteredTours();
    }, [search, minPriceFilter, maxPriceFilter, destinationFilter, Tours]);

    return (
        <div>
            <FilterContainer>
                <SearchBar>
                    <input
                        type="text"
                        placeholder="Buscar un tour"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchBar>
                <Filters>
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={minPriceFilter}
                        onChange={(e) => setMinPriceFilter(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={maxPriceFilter}
                        onChange={(e) => setMaxPriceFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Filtrar por destino"
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
                        destination={tour.destino.join(', ')}
                        duration={tour.duracion}
                        price={`$${tour.precio}`}
                        description={tour.descripcion}
                    />
                ))}
            </ToursContainer>
        </div>
    );
};
export default SearchTours;
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
`;
const FilterContainer = styled.div`
    margin-bottom: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 900px; /* Ajusta el ancho máximo según tus necesidades */
    padding: 1rem; /* Añade padding */
    border: 1px solid #ccc; /* Añade un borde */
    border-radius: 8px; /* Añade bordes redondeados */
    background: rgba(0, 0, 0, 0.5);
    margin-left: auto;
    margin-right: auto;
`;
const ToursContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
`;