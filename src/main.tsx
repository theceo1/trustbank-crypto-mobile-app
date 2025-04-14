
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';
import './index.css';

// Create root with proper type assertion
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

// Render the app in StrictMode to catch potential issues
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
