import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// set axios default backend URL using .env
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.baseURL = backendURL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
