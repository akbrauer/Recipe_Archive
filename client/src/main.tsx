import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from "./components/Home";
import NewRecipe from "./components/NewRecipe";
import Show from "./components/Show";
import Layout from "./components/Layout";
import RecipeList from "./components/RecipeList";
import EditRecipe from './components/EditRecipe';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipes", element: <RecipeList /> },
      { path: "/recipes/new", element: <NewRecipe /> },
      { path: "/recipes/:id", element: <Show/> },
      { path: "/recipes/:id/edit", element: <EditRecipe/> },
    ],
  },
]);


const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
