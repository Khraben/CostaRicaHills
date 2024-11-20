import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { loginUser, loginWithGoogle, registerUser } from './AuthServices';
import { UserContext } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

// Modal Component
const Modal = ({ visible, onClose, children,isDarkTheme }) => {
  if (!visible) return null;
  return (
    <ModalContainer isDarkTheme={isDarkTheme}onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {children}
    </ModalContainer>
  );
};

const LoginAuth = ({ onLogin }) => {
  const [modalType, setModalType] = useState('login'); // 'login', 'register', 'user-info'
  const { setUserPhoto } = useContext(UserContext);
  const [error, setError] = useState("");
  const { isDarkTheme } = useTheme();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !password) {
      setError("Todos los campos deben ser completados.");
      return;
    }

    if (email.includes(' ')) {
      setError("El correo electrónico no debe contener espacios.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("El correo no tiene un formato válido.");
      return;
    }
    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("La contraseña no es válida (debe contener al menos 6 caracteres).");
      return;
    }
    const success = await loginUser(email, password);
    if (success) {
      setError("");
      setModalType(null); // Cerrar modal
      onLogin(success); // Llamar a la función de callback
    } else {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const nombreUser = event.target['register-name'].value;
    const email = event.target['register-email'].value;
    const password = event.target['register-password'].value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!nombreUser || !email || !password) {
      setError("Todos los campos deben ser completados.");
      return;
    }
    if (email.includes(' ')) {
      setError("El correo electrónico no debe contener espacios.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("El correo no tiene un formato válido.");
      return;
    }
    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("La contraseña no es válida (debe contener al menos 6 caracteres).");
      return;
    }
    const success = await registerUser(email, password, nombreUser);
    if (success) {
      setUserPhoto('src/assets/userDefault.jpg');
      event.target.reset();
      setError("");
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      setModalType(null); // Cerrar modal
      onLogin(success);
    } else {
      setError('Error al iniciar sesión con Google.');
    }
  };

  return (
    <>
      {/* Modal de Iniciar Sesión */}
      <Modal visible={modalType === 'login'} onClose={() => setModalType(null)}isDarkTheme={isDarkTheme}>
        <Title isDarkTheme={isDarkTheme}>Iniciar Sesión</Title>
        <Form isDarkTheme={isDarkTheme}onSubmit={handleLogin}>
          <Label isDarkTheme={isDarkTheme}htmlFor="email">Correo:</Label>
          <Input isDarkTheme={isDarkTheme}type="email" id="email" />
          <Label isDarkTheme={isDarkTheme}htmlFor="password">Contraseña:</Label>
          <Input isDarkTheme={isDarkTheme}type="password" id="password" />
          <Button isDarkTheme={isDarkTheme}type="submit">Iniciar Sesión</Button>
        </Form>
        {error && <ErrorMessage isDarkTheme={isDarkTheme}>{error}</ErrorMessage>}
        <GoogleButton isDarkTheme={isDarkTheme}onClick={handleGoogleLogin}>
          <img src="src/assets/google-logo.png" alt="Google Logo" />
          Iniciar Sesión con Google
        </GoogleButton>
        <TextButton isDarkTheme={isDarkTheme}onClick={() => setModalType('register')}>¿No tienes cuenta? Registrarse</TextButton>
      </Modal>

      {/* Modal de Registro */}
      <Modal isDarkTheme={isDarkTheme}visible={modalType === 'register'} onClose={() => setModalType(null)}>
        <Title isDarkTheme={isDarkTheme}>Registrarse</Title>
        <Form isDarkTheme={isDarkTheme}onSubmit={handleRegister}>
          <Label isDarkTheme={isDarkTheme}htmlFor="register-name">Nombre:</Label>
          <Input isDarkTheme={isDarkTheme}type="text" id="register-name" />
          <Label isDarkTheme={isDarkTheme}htmlFor="register-email">Correo:</Label>
          <Input isDarkTheme={isDarkTheme}type="email" id="register-email" />
          <Label isDarkTheme={isDarkTheme}htmlFor="register-password">Contraseña:</Label>
          <Input isDarkTheme={isDarkTheme}type="password" id="register-password" />
          <Button isDarkTheme={isDarkTheme}type="submit">Registrarse</Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TextButton isDarkTheme={isDarkTheme} onClick={() => setModalType('login')}>¿Ya tienes cuenta? Iniciar Sesión</TextButton>
      </Modal>
    </>
  );
};

export default LoginAuth;

// Estilos
const ErrorMessage = styled.p`
   color: ${(props) => (props.isDarkTheme ? '#ff6b6b' : 'red')};
  font-weight: bold;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ModalContainer = styled.div`
 background-color: ${(props) => (props.isDarkTheme ? '#2c2c2c' : 'white')};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: fixed;
  top: 60px; /* Ajusta este valor según la altura de tu navbar */
  right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
 color: ${(props) => (props.isDarkTheme ? '#fff' : '#333')};
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: ${(props) => (props.isDarkTheme ? '#fff' : '#333')};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
 color: ${(props) => (props.isDarkTheme ? '#ccc' : '#555')};
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isDarkTheme ? '#555' : '#ccc')};
  background-color: ${(props) => (props.isDarkTheme ? '#444' : '#fff')};
  color: ${(props) => (props.isDarkTheme ? '#fff' : '#000')};
  font-size: 14px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isDarkTheme ? '#4caf50' : '#4caf50')};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;

  &:hover {
     background-color: ${(props) => (props.isDarkTheme ? '#45a049' : '#45a049')};
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
   background-color: ${(props) => (props.isDarkTheme ? '#555' : 'transparent')};
  border: 1px solid ${(props) => (props.isDarkTheme ? '#777' : '#ccc')};
  color: ${(props) => (props.isDarkTheme ? '#fff' : '#000')};
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.isDarkTheme ? 'rgba(66, 133, 244, 0.1)' : 'rgba(66, 133, 244, 0.1)')};
  }

  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
   color: ${(props) => (props.isDarkTheme ? '#1e90ff' : '#007bff')};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;