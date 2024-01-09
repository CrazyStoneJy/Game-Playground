import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MineSweep from "./mine-sweep";
import SudokuGame from "./sudoku";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/mineSweep",
        element: <MineSweep />,
    },
    {
        path: "/sudoku",
        element: <SudokuGame />,
    },
]);

const container = document.getElementById('root');
const root = createRoot(container!!); 
root.render(<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);
