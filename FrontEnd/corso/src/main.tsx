import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FirstPage from './components/FirstPage.tsx'
import App from './App.tsx'
import Login from './components/Login.tsx'
import  store  from './redux/store.ts'
import { Provider } from 'react-redux'
import ExchangePage from './components/ExchangePage.tsx'


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
