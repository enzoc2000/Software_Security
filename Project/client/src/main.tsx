import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FirstPage from './components/FirstPage'
import Login from './components/Login'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import ExchangePage from './components/ExchangePage'
import Registration from './components/Registration'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/firstPage",
    element: <FirstPage/>,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/exchangePage/:idAttore",
    element: <ExchangePage />,
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
