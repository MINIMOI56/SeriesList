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
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
