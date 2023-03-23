import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./views/root";
import Players from "./views/players";
import Matches from "./views/matches";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/players",
      element: <Players />,
    },
    {
      path: "/matches",
      element: <Matches />,
    },
  ],
  { basename: "/cp/dist/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
