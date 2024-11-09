import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import LoginAuth from '../components/LoginAuth';
import { auth } from '../config/firebase';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setUser, userPhoto, setUserPhoto } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
    const handleLogin = (loggedInUser) => {
      if (loggedInUser) {
      setUser(auth.currentUser);
      setUserPhoto(user.photoURL);
      }
    };
    const handleUserPhotoClick = () => {
      if (user) {
        navigate('profile');
      } else {
        setShowLogin(!showLogin);
      }
    };
    return (
      <HeaderContainer>
        <Nav>
          <LogoContainer>
            <LogoLink href="/">
              <img src="src/assets/Logo Costa Rica Hills sin fondo.png" alt="Logo" />
              <span>Costa Rica Hills</span>
            </LogoLink>
          </LogoContainer>
          <NavLinks>
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
        <script>
          {`
            window.addEventListener("scroll", function () {
              const header = document.querySelector(".navbar");
              if (window.scrollY > 50) {
                header.classList.add("scrolled");
              } else {
                header.classList.remove("scrolled");
              }
            });
          `}
        </script>
      </HeaderContainer>
    );
  };

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: background-color 0.3s ease;
  z-index: 1000; /* Asegura que la navbar esté por encima de otros elementos */

  &.scrolled {
    background-color: white;
  }

  &.scrolled .logo-container span,
  &.scrolled .nav-links a {
    color: black; /* Cambia el color del texto a negro */
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  span:hover {
    color: #00a08b; /* Gris oscuro al hacer hover */
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
    color: #ffffff; /* Gris oscuro */
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #ffffff; /* Gris intermedio */
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #00a08b; /* Gris oscuro al hacer hover */
    }
  }
`;

const UserPhoto = styled.img`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    transform: scale(1.1); /* Aumentar ligeramente el tamaño */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
    border: 4px solid #00a08b; /* Borde azul (puedes cambiar el color) */
  }
`;