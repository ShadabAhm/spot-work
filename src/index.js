import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import AppLayout from './AppLayout';
import Home from './components/Home/Home';
import About from './components/About';
import Login from './components/auth/login';
import PrivateRoute from './PrivateRoute';
import AuthLayout from './AuthLayout';
import Register from './components/auth/register';
import Pricing from './components/general/Pricing';
import Profile from './components/general/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />, // all protected routes
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      {
        path: '/home',
        element: <AppLayout />,
        children: [{ path: '', element: <Home /> }],
      },
      {
        path: '/about',
        element: <AppLayout />,
        children: [{ path: '', element: <About /> }],
      },
      
      {
        path: '/pricing',
        element: <AppLayout />,
        children: [{ path: '', element: <Pricing /> }],
      },
      {
        path: '/profile',
        element: <AppLayout />,
        children: [{ path: '', element: <Profile /> }],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />, // <-- wraps login page
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
