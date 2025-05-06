import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'

import FirstPage from './components/FirstPage.tsx'
import App from './App.tsx'
import Login from './components/Login.tsx'
import  store  from './redux/store.ts'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/firstPage",
    element: <FirstPage/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/firstPage/:userId",
    element: <ExchangePage />,
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <FirstPage
      name="Mario Rossi"
      crediti="1000"
      CO2="1000">
    </FirstPage> 
    <Login></Login> */}
  </React.StrictMode>,
)
