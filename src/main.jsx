import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Abertura from './pages/Abertura/Abertura';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Abertura />
  </StrictMode>,
)
