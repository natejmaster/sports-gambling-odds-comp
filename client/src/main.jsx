import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BetPage from "./pages/BetPage.jsx";
import Profile from "./pages/Profile.jsx";

// Create React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "betpage",
        element: <BetPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
