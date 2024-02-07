import React, { useEffect } from "react";
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
        path: "/snake",
        name: "snake",
    },
    {
        path: "/tetris",
        name: "tetris",
    },
    {
        path: "/gameOfLife",
        name: "gameOfLife",
    },
    {
        path: "/sudoku",
        name: "sudoku",
    },
    {
        path: "/xigua",
        name: "xigua",
    },
];

function App() {

    useEffect(() => {
        console.log('home init');
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="flex flex-row justify-center items-center text-4xl mt-10">简易游戏游乐场</div>
                <div className="flex flex-row flex-wrap items-center justify-center h-auto w-screen">
                    {routers.map((route: Route, index: number) => {
                        return (
                            <div
                                key={`item_${index}`}
                                className="flex items-center justify-center bg-blue-300 hover:bg-blue-200 text-white h-40 w-1/5 mr-5 text-4xl my-10"
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
