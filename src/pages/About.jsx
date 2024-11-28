import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const About = () => {
    const { i18n } = useTranslation("global");
    return (
        <PageContainer>
            <HeroSection>
                <Content>
                    <h1>{i18n.t("about_us")}</h1>
                    <p>
                        {i18n.t("subTitleAbout")}
                    </p>
                </Content>
            </HeroSection>
            <AboutSection>
                <h2>{i18n.t("subTitleOurHistory")}</h2>
                <p>
                    {i18n.t("descriptionHistory")}
                </p>
            </AboutSection>
            <ContactSection>
                <h2>{i18n.t("subTitleContact")}</h2>
                <p>{i18n.t("descriptionContact")}</p>
                <p>Email: costaricahills@gmail.com</p>
                <p>{i18n.t("phone")} +506 85305671</p>
            </ContactSection>
        </PageContainer>
    );
};

export default About;

const PageContainer = styled.div`
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
`;

const HeroSection = styled.section`
    position: relative;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 0;

    h1{
        color:#afdb11;
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

const AboutSection = styled.section`
    position: relative;
    padding: 1rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color:#afdb11;
    }

    p {
        font-size: 1.2rem;
    }
`;

const TeamSection = styled.section`
    position: relative;
    padding: 1rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color:#afdb11;
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
    padding: 1rem 0;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color:#afdb11;
    }

    p {
        font-size: 1.2rem;
    }
`;