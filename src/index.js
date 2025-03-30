import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import AppLayout from './AppLayout';
import Home from './components/Home/Home';
import About from './components/About';
import Login from './components/auth/login';
import PrivateRoute from './PrivateRoute';


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: <PrivateRoute />,  // Protect all child routes
    children: [
      { path: "/", element: <Navigate to="/home" replace /> }, 
      { path: "/home", element: <AppLayout />, children: [{ path: "", element: <Home /> }] },
      { path: "/about", element: <AppLayout />, children: [{ path: "", element: <About /> }] },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
