import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// HashRouter, not BrowserRouter: GitHub Pages serves static files only, so a
// deep link like /inspections/demo-3 would 404 before React ever loads. Hash
// routing keeps every route on index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
