import React, { useState } from 'react';
import styled from 'styled-components';
import { loginUser, loginWithGoogle, registerUser, logoutUser } from './AuthServices';

// Modal Component
const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

const LoginAuth = ({ onLogin }) => {
  const [modalType, setModalType] = useState('login'); // 'login', 'register', 'user-info'
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const success = await loginUser(email, password);
    if (success) {
      setUser(success); // Guardar usuario
      setModalType(null); // Cerrar modal
      onLogin(success); // Llamar a la función de callback
    } else {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const nombreUser = event.target['register-name'].value;
    const email = event.target['register-email'].value;
    const password = event.target['register-password'].value;
    const success = await registerUser(email, password, nombreUser);
    if (success) {
      event.target.reset();
      setModalType('login'); // Cambiar al modal de inicio de sesión
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      setUser(success);
      setModalType(null); // Cerrar modal
      onLogin(success);
    } else {
      alert('Error al iniciar sesión con Google.');
    }
  };

  return (
    <>
      {/* Modal de Iniciar Sesión */}
      <Modal visible={modalType === 'login'} onClose={() => setModalType(null)}>
        <Title>Iniciar Sesión</Title>
        <Form onSubmit={handleLogin}>
          <Label htmlFor="email">Correo:</Label>
          <Input type="email" id="email" required />
          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" id="password" required />
          <Button type="submit">Iniciar Sesión</Button>
        </Form>
        <GoogleButton onClick={handleGoogleLogin}>
          <img src="src/assets/google-logo.png" alt="Google Logo" />
          Iniciar Sesión con Google
        </GoogleButton>
        <TextButton onClick={() => setModalType('register')}>¿No tienes cuenta? Registrarse</TextButton>
      </Modal>

      {/* Modal de Registro */}
      <Modal visible={modalType === 'register'} onClose={() => setModalType(null)}>
        <Title>Registrarse</Title>
        <Form onSubmit={handleRegister}>
          <Label htmlFor="register-name">Nombre:</Label>
          <Input type="text" id="register-name" required />
          <Label htmlFor="register-email">Correo:</Label>
          <Input type="email" id="register-email" required />
          <Label htmlFor="register-password">Contraseña:</Label>
          <Input type="password" id="register-password" required />
          <Button type="submit">Registrarse</Button>
        </Form>
        <TextButton onClick={() => setModalType('login')}>¿Ya tienes cuenta? Iniciar Sesión</TextButton>
      </Modal>

    </>
  );
};

export default LoginAuth;
// Estilos
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;
const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-bottom: 8px;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: rgba(66, 133, 244, 0.1); /* Color de fondo al pasar el mouse */
  }

  img {
    height: 30px; /* Reduce el tamaño del logo */
    margin-right: 8px; /* Espaciado entre el logo y el texto */
  }
`;
const TextButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;