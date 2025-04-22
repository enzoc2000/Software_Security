import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/Login.tsx'
import FirstPage from './components/FirstPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstPage 
    name='Matteo'
    age='27' />
  </StrictMode>,
)
