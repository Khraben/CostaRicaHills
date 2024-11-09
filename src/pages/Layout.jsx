import React from 'react';
import styled from 'styled-components';
import Header from './Home';
import { Helmet } from 'react-helmet';
const Layout = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content="Astro description" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content="React" />
        <title>{title}</title>
      </Helmet>
      <Body>
        <Header />
        <Content>
          {children}
          </Content>
        <VideoBackground autoPlay muted loop>
          <source src="src/assets/volcan.mp4" type="video/mp4" />
        </VideoBackground>
      </Body>
      <GlobalStyle />
    </>
  );
};
const Content = styled.main`
  flex: 1;
  padding-top: 4rem; // Ajusta según la altura del navbar
`;
const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  :root {
    --accent: 136, 58, 234;
    --accent-light: 224, 204, 250;
    --accent-dark: 49, 10, 101;
    --accent-gradient: linear-gradient(
      45deg,
      rgb(var(--accent)),
      rgb(var(--accent-light)) 30%,
      white 60%
    );
  }
  html {
    font-family: 'Montserrat', system-ui, sans-serif;
    background: whitesmoke;
    background-size: 224px;
    color: #121212;
  }
  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }
`;

const Body = styled.body`
  margin: 0;
  padding: 0;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
`;

export default Layout;