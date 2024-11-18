import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';

const SearchTours = () => {
    const [search, setSearch] = useState('');
    const [filteredTours, setFilteredTours] = useState([]);
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [destinationFilter, setDestinationFilter] = useState('');
    const tours = [
        {
            title: "Tour al Volcán Arenal",
            description: "Explora el majestuoso Volcán Arenal y sus alrededores.",
            images: [
                "https://media.istockphoto.com/id/1388560096/es/foto/volcán-arenal-y-lago-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=IOjviPyw-bLeVK2Sy1bHDvBOt0NponmGqPo5aEOtmH8=",
                "https://media.istockphoto.com/id/521542828/es/foto/el-volcán-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=2zXY5J2omcvXySKeoqOBApzZKNcyDIQMGJRjhwYYRdQ=",
                "https://media.istockphoto.com/id/112785578/es/foto/el-volcán-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=DGH0FKnrAXxAtpWo39hR9w63r4cCWa-2eGHN5BC4Xss=",
                "https://media.istockphoto.com/id/1189027264/es/foto/arenal-volcano-costa-rica.jpg?s=612x612&w=0&k=20&c=snxTYP_E6nmuEYg-7bCIkkTuCMzljt42XJu1chBigBg="
            ],
            destination: "La Fortuna, Alajuela",
            duration: "8 horas",
            price: "$120"
        },
        {
            title: "Tour a la Playa Manuel Antonio",
            description: "Disfruta de las hermosas playas y la biodiversidad del Parque Nacional Manuel Antonio.",
            images: [
                "https://media.istockphoto.com/id/1395347767/es/foto/costa-y-playa-parque-nacional-manuel-antonio-costa-rica.jpg?s=612x612&w=0&k=20&c=kaTj1Mpj-SWYGicIvRtNqbw1oIL6D-nfeC7TOHyd-Gg=",
                "https://media.istockphoto.com/id/1199465258/es/foto/vista-de-drones-del-parque-nacional-manuel-antonio-en-costa-rica.jpg?s=612x612&w=0&k=20&c=XGo4W0HE94hi56k_DnoOqxKU4YV-FqPCKYZ99sWA_48=",
                "https://media.istockphoto.com/id/1436674562/es/foto/primer-plano-de-un-perezoso-en-un-árbol-con-las-hojas-verdes-alrededor-en-el-parque-nacional.jpg?s=612x612&w=0&k=20&c=MTSwNCz3lwk0VCHuq9Ak4HIYwewsmkU7KwaeNhsuDjE="
            ],
            destination: "Quepos, Puntarenas",
            duration: "6 horas",
            price: "$90"
        }
    ];

    useEffect(() => {
        const fetchFilteredTours = async () => {
            try {
                const filtered = tours.filter(tour => {
                    const matchesSearch = tour.title.toLowerCase().includes(search.toLowerCase());
                    const price = parseFloat(tour.price.replace('$', ''));
                    const matchesMinPrice = minPriceFilter ? price >= parseFloat(minPriceFilter) : true;
                    const matchesMaxPrice = maxPriceFilter ? price <= parseFloat(maxPriceFilter) : true;
                    const matchesDestination = tour.destination.toLowerCase().includes(destinationFilter.toLowerCase());
                    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesDestination;
                });
                setFilteredTours(filtered);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFilteredTours();
    }, [search, minPriceFilter, maxPriceFilter, destinationFilter, tours]);

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
                        title={tour.title}
                        images={tour.images}
                        destination={tour.destination}
                        duration={tour.duration}
                        price={tour.price}
                        description={tour.description}
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