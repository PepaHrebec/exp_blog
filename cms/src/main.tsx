import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TryForm from "./routes/form";
import { signInAction } from "./lib/actions";
import Dashboard from "./routes/dashboard";
import { loggedInLoader, dashboardLoader } from "./lib/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Index</div>,
    loader: loggedInLoader,
  },
  {
    path: "/log-in",
    element: <TryForm />,
    action: signInAction,
    loader: loggedInLoader,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
