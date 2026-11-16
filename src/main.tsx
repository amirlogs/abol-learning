import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installAbolApiProxy } from './abolApiProxy'
import { bootstrapAbolBraille } from './abolBrailleBootstrap'
import App from './App.tsx'
import './index.css'

installAbolApiProxy()
bootstrapAbolBraille()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
