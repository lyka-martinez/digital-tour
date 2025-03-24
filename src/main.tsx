import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import VirtualTourApp from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <VirtualTourApp />
    </StrictMode>,
)
