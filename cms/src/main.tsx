import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TryForm from "./routes/form";
import { signInAction } from "./lib/actions";
import Dashboard from "./routes/dashboard";
import {
  logInComponentLoader,
  dashboardLoader,
  postsLoader,
  postLoader,
} from "./lib/loaders";
import Posts from "./routes/posts";
import Post from "./routes/post";

const router = createBrowserRouter([
  {
    path: "/log-in",
    element: <TryForm />,
    action: signInAction,
    loader: logInComponentLoader,
  },
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
    children: [
      { index: true, element: <div>Default</div> },
      {
        path: "posts",
        loader: postsLoader,
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        loader: ({ params }) => postLoader(params),
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
