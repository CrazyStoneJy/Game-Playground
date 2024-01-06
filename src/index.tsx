import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MineSweep from "./mine-sweep";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/mineSweep",
        element: <MineSweep />,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root")
);
