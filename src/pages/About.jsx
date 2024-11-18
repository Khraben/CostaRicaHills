import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <PageContainer>
            <HeroSection>
                <Content>
                    <h1>Sobre Nosotros</h1>
                    <p>
                        En Costa Rica Hills, nos apasiona mostrar la belleza natural de Costa Rica a través de experiencias únicas y memorables.
                    </p>
                </Content>
            </HeroSection>
            <AboutSection>
                <h2>Nuestra Historia</h2>
                <p>
                    Fundada en 2010, Costa Rica Hills ha crecido hasta convertirse en una de las principales agencias de tours en Costa Rica. Nos enorgullece ofrecer tours personalizados que destacan la biodiversidad y la cultura de nuestro hermoso país.
                </p>
            </AboutSection>
            <TeamSection>
                <h2>Conoce a Nuestro Equipo</h2>
                <TeamContainer>
                    <TeamMember>
                        <img src="https://via.placeholder.com/150" alt="Miembro del equipo" />
                        <h3>Juan Pérez</h3>
                        <p>Guía de Tours</p>
                    </TeamMember>
                    <TeamMember>
                        <img src="https://via.placeholder.com/150" alt="Miembro del equipo" />
                        <h3>María González</h3>
                        <p>Coordinadora de Tours</p>
                    </TeamMember>
                    <TeamMember>
                        <img src="https://via.placeholder.com/150" alt="Miembro del equipo" />
                        <h3>Carlos Rodríguez</h3>
                        <p>Especialista en Reservas</p>
                    </TeamMember>
                </TeamContainer>
            </TeamSection>
            <ContactSection>
                <h2>Contacto</h2>
                <p>Para más información, contáctanos en:</p>
                <p>Email: info@costaricahills.com</p>
                <p>Teléfono: +506 1234 5678</p>
            </ContactSection>
        </PageContainer>
    );
};

export default About;

const PageContainer = styled.div`
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 2rem;
`;

const HeroSection = styled.section`
    position: relative;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 0;
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

const AboutSection = styled.section`
    position: relative;
    padding: 2rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
    }
`;

const TeamSection = styled.section`
    position: relative;
    padding: 2rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
`;

const TeamContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    justify-items: center;
    align-items: start;
`;

const TeamMember = styled.div`
    text-align: center;

    img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        object-fit: cover;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.2rem;
    }
`;

const ContactSection = styled.section`
    position: relative;
    padding: 2rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
    }
`;