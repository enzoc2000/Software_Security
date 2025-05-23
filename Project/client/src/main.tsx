// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';   // ← importa BrowserRouter
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>             {/* ← avvolgi qui */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
