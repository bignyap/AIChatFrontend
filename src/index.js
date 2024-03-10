import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from './services/UserService';

const root = ReactDOM.createRoot(document.getElementById('root'));

const initApp = () => {
  const renderApp = () => root.render(<App />);
  renderApp();
};

UserService.initKeycloak(initApp);

