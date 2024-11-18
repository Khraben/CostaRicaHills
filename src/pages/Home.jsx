import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Home = () => {

    return (
        <PageContainer>
            <HeroSection>
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
                        images={[
                            "https://media.istockphoto.com/id/1388560096/es/foto/volcán-arenal-y-lago-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=IOjviPyw-bLeVK2Sy1bHDvBOt0NponmGqPo5aEOtmH8=",
                            "https://media.istockphoto.com/id/521542828/es/foto/el-volcán-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=2zXY5J2omcvXySKeoqOBApzZKNcyDIQMGJRjhwYYRdQ=",
                            "https://media.istockphoto.com/id/112785578/es/foto/el-volcán-arenal-costa-rica.jpg?s=612x612&w=0&k=20&c=DGH0FKnrAXxAtpWo39hR9w63r4cCWa-2eGHN5BC4Xss=",
                            "https://media.istockphoto.com/id/1189027264/es/foto/arenal-volcano-costa-rica.jpg?s=612x612&w=0&k=20&c=snxTYP_E6nmuEYg-7bCIkkTuCMzljt42XJu1chBigBg="
                          ]}
                        destination="La Fortuna, Alajuela"
                        duration="8 horas"
                        price="$120"
                    />
                    <Card
                        title="Tour a la Playa Manuel Antonio"
                        description="Disfruta de las hermosas playas y la biodiversidad del Parque Nacional Manuel Antonio."
                        images={[
                            "https://media.istockphoto.com/id/1395347767/es/foto/costa-y-playa-parque-nacional-manuel-antonio-costa-rica.jpg?s=612x612&w=0&k=20&c=kaTj1Mpj-SWYGicIvRtNqbw1oIL6D-nfeC7TOHyd-Gg=",
                            "https://media.istockphoto.com/id/1199465258/es/foto/vista-de-drones-del-parque-nacional-manuel-antonio-en-costa-rica.jpg?s=612x612&w=0&k=20&c=XGo4W0HE94hi56k_DnoOqxKU4YV-FqPCKYZ99sWA_48=",
                            "https://media.istockphoto.com/id/1436674562/es/foto/primer-plano-de-un-perezoso-en-un-árbol-con-las-hojas-verdes-alrededor-en-el-parque-nacional.jpg?s=612x612&w=0&k=20&c=MTSwNCz3lwk0VCHuq9Ak4HIYwewsmkU7KwaeNhsuDjE="    
                        ]}
                        destination="Quepos, Puntarenas"
                        duration="6 horas"
                        price="$90"
                    />
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