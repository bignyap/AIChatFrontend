import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from './services/UserService';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppContainer = () => {
  const [isKeycloakInitialized, setIsKeycloakInitialized] = useState(false);

  useEffect(() => {
    async function initializeKeycloak() {
      try {
        await UserService.initKeycloak();
        setIsKeycloakInitialized(true);
      } catch (error) {
        // Handle Keycloak initialization error
        console.error('Failed to initialize Keycloak:', error);
        // You can set a state variable here to indicate initialization failure
      }
    }
    initializeKeycloak();
  }, []);

  return isKeycloakInitialized ? <App /> : <div></div>;
};

root.render(<AppContainer />);
