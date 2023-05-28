import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root";
import Convert from "./pages/convert";
import About from "./pages/about";
import NotFound from "./pages/NotFound";
import Document from "./pages/document";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Convert />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Document",
        element: <Document />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
