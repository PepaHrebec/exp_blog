import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  logInAction,
  postCreateAction,
  delCommentAction,
  updateActions,
} from "./lib/actions";
import {
  logInLoader,
  logOutLoader,
  dashboardLoader,
  postsLoader,
  postLoader,
} from "./lib/loaders";
import TryForm from "./elements/LogInForm";
import Dashboard from "./elements/Dashboard";
import Posts from "./elements/Posts";
import Post from "./elements/Post";
import PostCreate from "./elements/PostCreate";
import PostUpdate from "./elements/PostUpdate";

const router = createBrowserRouter([
  {
    path: "/log-in",
    element: <TryForm />,
    action: logInAction,
    loader: logInLoader,
  },
  {
    path: "/log-out",
    loader: logOutLoader,
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
        path: "posts/create",
        action: postCreateAction,
        element: <PostCreate />,
      },
      {
        path: "posts/:postId",
        loader: ({ params }) => postLoader(params),
        action: delCommentAction,
        element: <Post />,
      },
      {
        path: "posts/:postId/update",
        loader: ({ params }) => postLoader(params),
        action: updateActions,
        element: <PostUpdate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
