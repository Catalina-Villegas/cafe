// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./components/css/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UsersProvider } from './context/UsersContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsersProvider>        
      <App />
    </UsersProvider>
  </React.StrictMode>
);

reportWebVitals();