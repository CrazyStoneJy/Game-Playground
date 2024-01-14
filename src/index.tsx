import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MineSweep from "./mine-sweep";
import SudokuGame from "./sudoku";
import GameOfLife from "./game-of-life";
import Snake from "./snake";

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
    {
        path: "/gameOfLife",
        element: <GameOfLife />,
    },
    {
        path: "/snake",
        element: <Snake />,
    },
]);

const container = document.getElementById("root");
const root = createRoot(container!!);
root.render(<RouterProvider router={router} />);
