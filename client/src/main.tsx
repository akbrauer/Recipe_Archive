import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from "./components/Home";
import Contact from "./components/Contact";
import Show from "./components/Show";
import Layout from "./components/Layout";
import RecipeList from "./components/RecipeList";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/show", element: <Show /> },
      { path: "/contact", element: <Contact /> },
      { path: "/all", element: <RecipeList /> },
    ],
  },
]);


const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
