import React from "react";
import { Link } from "react-router-dom";

type Route = {
    path: string;
    name: string;
};
const routers: Route[] = [
    {
        path: "/mineSweep",
        name: "mine sweep",
    },
    {
        path: "/sudoku",
        name: "sudoku",
    },
    {
        path: "/gameOfLife",
        name: "gameOfLife",
    },
];

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="flex flex-row justify-center items-center text-4xl mt-10">简易游戏游乐场</div>
                <div className="flex flex-1 justify-center items-center h-screen w-screen">
                    {routers.map((route: Route, index: number) => {
                        return (
                            <div
                                key={`item_${index}`}
                                className="flex items-center justify-center bg-blue-300 hover:bg-blue-200 text-white h-1/5 w-1/5 mr-5 mb-96 text-4xl"
                            >
                                <Link to={route.path}>{route.name}</Link>
                            </div>
                        );
                    })}
                </div>
            </header>
        </div>
    );
}

export default App;
