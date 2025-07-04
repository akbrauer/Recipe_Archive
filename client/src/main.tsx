import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
	throw new Error("Check the Clerk key in .env!!!");
}

import Layout from "./components/Layout";
import Home from "./components/Home";
import RecipeList from "./components/ui/AllRecipes/RecipeList";
import NewRecipe from "./components/NewRecipe";
import Show from "./components/Show";
import EditRecipe from "./components/EditRecipe";
import Login from "./components/Login";

const router = createBrowserRouter([
	{
		element: <Home />,
		path: "/"
	},
	{
		element: <Layout />,
		children: [
			{ path: "/recipes", element: <RecipeList /> },
			{ path: "/recipes/new", element: <NewRecipe /> },
			{ path: "/recipes/new/login", element: <Login heading={"Please sign in to add or edit recipes."} redirect="/recipes/new"/> },
			{ path: "/recipes/:id", element: <Show /> },
			{ path: "/recipes/:id/edit", element: <EditRecipe /> },
			{ path: "/login", element: <Login /> },
		],
	},
]);

const root = createRoot(document.getElementById("root")!);
root.render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/recipes">
			<RouterProvider router={router} />
		</ClerkProvider>
	</StrictMode>
);
