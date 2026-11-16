import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { RecruiterProvider } from './context/RecruiterContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <RecruiterProvider>
          <App />
        </RecruiterProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
