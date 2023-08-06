import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import DisconectedLayout from './shared/layouts/disconnected-layout';
import ConnectedLayout from './shared/layouts/connected-layout';

import Home from './routes/home';
import Connexion from './routes/connexion';
import Inscription from './routes/inscription';
import Serie from './routes/serie';


const router = createBrowserRouter([
  {
    path: "/",
    element: <DisconectedLayout />,
    children: [
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
    ]
  },
  {
    path: "/",
    element: <ConnectedLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/serie/:id",
        element: <Serie />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);