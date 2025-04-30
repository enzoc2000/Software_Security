import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import Login from './components/Login.tsx'
import FirstPage from './components/FirstPage.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <FirstPage
      name="Mario Rossi"
      crediti="1000"
      CO2="1000">
    </FirstPage> */}
    <App></App>
  </StrictMode>,
)
