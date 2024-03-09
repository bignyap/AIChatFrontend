import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserService from './services/UserService';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(<App />);
UserService.initKeycloak(renderApp);
