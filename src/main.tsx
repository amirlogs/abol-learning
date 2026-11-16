import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installAbolApiProxy } from './abolApiProxy'
import App from './App.tsx'
import './index.css'

installAbolApiProxy()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
