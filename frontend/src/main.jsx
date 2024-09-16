import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Toaster should be included here */}
      <AuthContextProvider>
      <Toaster/>
      <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
