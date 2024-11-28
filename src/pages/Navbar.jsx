import styled from "styled-components";
import React, { useContext, useState, useEffect } from "react";
import LoginAuth from "../components/LoginAuth";
import { auth } from "../config/firebase";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Header = () => {
  const { user, userPhoto, setUserPhoto } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { i18n } = useTranslation("global");

  const handleLogin = (loggedInUser) => {
    if (loggedInUser) {
      const user = auth.currentUser;
      setUserPhoto(user.photoURL);
    }
  };

  const handleUserPhotoClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      setShowLogin(!showLogin);
    }
  };

  const handleToursClick = () => {
    navigate("/tours");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    i18next.changeLanguage(event.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderContainer
      className={`${scrolled ? "scrolled" : ""} ${
        isDarkTheme ? "dark" : "light"
      }`}
    >
      <Nav>
        <LogoContainer className="logo-container">
          <LogoLink isDarkTheme={isDarkTheme} onClick={handleHomeClick}>
            <img src="/assets/Logo Costa Rica Hills sin fondo.png" alt="Logo" />
            <span>Costa Rica Hills</span>
          </LogoLink>
        </LogoContainer>
        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </HamburgerButton>
        <NavLinks
          isDarkTheme={isDarkTheme}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkTheme ? <FaSun color="#FFD700" /> : <FaMoon color="#000" />}
          </ThemeToggleButton>
          <a onClick={handleToursClick}>{i18n.t("tours")}</a>
          <a onClick={handleAboutClick}>{i18n.t("about_us")}</a>
          <LanguageSelectContainer>
            <LanguageSelect
              value={language}
              onChange={handleLanguageChange}
              isDarkTheme={isDarkTheme}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </LanguageSelect>
          </LanguageSelectContainer>
          <UserPhoto
            isDarkTheme={isDarkTheme}
            src={userPhoto}
            alt="Foto de Usuario"
            id="user-photo"
            onClick={handleUserPhotoClick}
          />
        </NavLinks>
      </Nav>
      {showLogin && !user && <LoginAuth onLogin={handleLogin} />}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: background-color 0.3s ease;
  z-index: 1000;
  &.dark {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    &.scrolled .logo-container span,
    &.scrolled .nav-links a {
      color: white;
    }
  }
  &.light {
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    &.scrolled .logo-container span,
    &.scrolled .nav-links a {
      color: black;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  cursor: pointer;
  span:hover {
    color: ${(props) => (props.isDarkTheme ? "#FFD700" : "#007bff")};
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

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkTheme ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
    &.open {
      display: flex;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: ${(props) => (props.isDarkTheme ? "#FFD700" : "#007bff")};
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
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 4px solid ${(props) => (props.isDarkTheme ? "#FFD700" : "#007bff")};
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

const LanguageSelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:after {
    content: "▼";
    position: absolute;
    right: 0.5rem;
    pointer-events: none;
    color: inherit;
  }
`;

const LanguageSelect = styled.select`
  appearance: none;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: bold;
  padding-right: 1.5rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => (props.isDarkTheme ? "#FFD700" : "#007bff")};
  }
  option {
    background: ${(props) => (props.isDarkTheme ? "#333" : "#fff")};
    color: ${(props) => (props.isDarkTheme ? "#fff" : "#000")};
  }
`;
