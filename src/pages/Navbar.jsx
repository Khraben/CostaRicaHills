import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import LoginAuth from '../components/LoginAuth';
import { auth } from '../config/firebase';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {FaSun, FaMoon} from 'react-icons/fa';


const Header = () => {
  const { user, userPhoto, setUserPhoto } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme(); 

  const handleLogin = (loggedInUser) => {
    if (loggedInUser) {
      const user = auth.currentUser;
      setUserPhoto(user.photoURL);
    }
  };

  const handleUserPhotoClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowLogin(!showLogin);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer className={`${scrolled ? 'scrolled' : ''} ${isDarkTheme ? 'dark' : 'light'}`}>
      <Nav>
        <LogoContainer className="logo-container">
          <LogoLink href="/">
            <img src="src/assets/Logo Costa Rica Hills sin fondo.png" alt="Logo" />
            <span>Costa Rica Hills</span>
          </LogoLink>
        </LogoContainer>
        <NavLinks className="nav-links">
        <ThemeToggleButton onClick={toggleTheme}>
           {isDarkTheme ? <FaSun color="#FFD700" /> : <FaMoon color="#000" />}
          </ThemeToggleButton>
          <a href="/tours">Tours</a>
          <a href="/about">Sobre Nosotros</a>
          <UserPhoto
            src={userPhoto}
            alt="Foto de Usuario"
            id="user-photo"
            onClick={handleUserPhotoClick} 
          />
        </NavLinks>
      </Nav>
      {showLogin && !user && <LoginAuth onLogin={handleLogin} />} {/* Renderiza LoginAuth si showLogin es true y no hay usuario */}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo con opacidad casi negra */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: background-color 0.3s ease;
  z-index: 1000; 
  &.dark {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    &.scrolled .logo-container span,
    &.scrolled .nav-links a {
    color: white; /* Cambia el color del texto*/
    }
  }
  &.light {
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    &.scrolled .logo-container span,
    &.scrolled .nav-links a {
     color: black; /* Cambia el color del texto*/
    }
  }
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 0 1.5rem; /* Añadir padding para que no se pegue a los bordes */
  margin: 0 auto;
`;
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-weight: bold; /* Texto en negrita */
  span:hover {
    color: #afdb11; /* Gris oscuro al hacer hover */
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 2.5rem;
    width: 2.5rem;
  }
  span {
    margin-left: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: inherit;
  }
`;
const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  a {
    color: inherit; /* Hereda el color del HeaderContainer */
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: bold; /* Texto en negrita */
    &:hover {
      color: #afdb11; 
    }
  }
`;
const UserPhoto = styled.img`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.1); /* Aumentar ligeramente el tamaño */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
    border: 4px solid #afdb11;
  }
`;
const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #afdb11;
  }
`;