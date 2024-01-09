import React, { useEffect, useRef, useState } from "react";
import gen, { Cell, getUnmarkedMineCount, isMine, show } from "./gen";
import { clone } from "../base/utils";
import CellView from "./cell";
import { DIF, EASY, Level, MID } from "./level";

enum GameState {
    INIT = 0,
    RUNNING = INIT + 1,
    FINISHED = RUNNING + 1,
}

function MineSweeper() {
    const [grids, updateGrids] = useState([] as Cell[][]);
    const [state, setState] = useState(GameState.INIT);
    const isStartRef = useRef(false);
    const [point, updatePoint] = useState({ x: -1, y: -1 });
    const [level, refreshLevel] = useState(EASY);
    const [mineCount, changeMineCount] = useState(0);
    const [countdown, refrsehCountdown] = useState(0);
    const [isCountdown, changeCountdownState] = useState(false);
    let intervalId: number;

    useEffect(() => {
        updateGrids(gen(level));
        changeMineCount(level.mineCount);
        return (() => {
            clearInterval(intervalId)
        });
    }, []);

    useEffect(() => {
        if (point.x !== -1 && point.y !== -1 && grids) {
            check(grids, point.x, point.y);
        }
    }, [grids]);

    useEffect(() => {
        updateGrids(gen(level));
        changeMineCount(level.mineCount);
    }, [level]);

    function startCountdown() {
        // @ts-ignore
        intervalId = setInterval(() => {
            refrsehCountdown(cd => cd + 1);
        }, 1000);
    }

    const click = (x: number, y: number) => {
        if (state > GameState.RUNNING) {
            return;
        }
        updatePoint({ x, y });
        if (state < GameState.RUNNING) {
            setState(GameState.RUNNING);
        }
        let clickedGrids = grids;
        if (!isStartRef.current) {
            clickedGrids = gen(level, { x, y });
            isStartRef.current = true;
        }
        updateGrids(show({ x, y }, clickedGrids));
        if (!isCountdown) {
            changeCountdownState(true);
            startCountdown();
        }
    };

    function resetTimer() {
        clearInterval(intervalId);
        changeCountdownState(false);
        refrsehCountdown(0);   
    }

    function check(matrix: Cell[][], x: number, y: number) {
        // check result
        setTimeout(() => {
            if (isMine(matrix[y][x])) {
                setState(GameState.FINISHED);
                resetTimer();
                setTimeout(() => {
                    alert("you lost");
                }, 100);
                return;
            }
            const cells = matrix.flat();
            const shownCount = cells.filter(
                (cell: Cell) => cell.isShown
            ).length;
            const mineFlagCount = cells.filter(
                (cell: Cell) => isMine(cell) && cell.isFlag
            ).length;
            if (shownCount + mineFlagCount === cells.length) {
                resetTimer();
                setTimeout(() => {
                    alert("you win");
                }, 100);
            }
        }, 100);
    }

    const flagClick = (v_index: number, h_index: number) => {
        const matrix = clone(grids);
        const cell = matrix[v_index][h_index];
        cell.isFlag = !cell.isFlag;
        updateGrids(matrix);
        changeMineCount(getUnmarkedMineCount(matrix));
    };

    function reset() {
        setState(GameState.INIT);
        updateGrids(gen(level));
        changeMineCount(level.mineCount);
        isStartRef.current = false;
        resetTimer();
    }

    function changeLevel(level: Level) {
        resetTimer();
        refreshLevel(level);
        isStartRef.current = false;
    }

    function renderHeader() {
        return (
            <div className="flex flex-row justify-center items-center my-5">
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white mr-2"
                    onClick={() => {
                        const matrix = clone(grids);
                        matrix.flat().forEach((cell: Cell) => {
                            cell.isShown = true;
                        });
                        updateGrids(matrix);
                    }}
                >
                    显示
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white mr-2"
                    onClick={() => {
                        reset();
                    }}
                >
                    重置
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white mr-2"
                    onClick={() => {
                        changeLevel(EASY);
                    }}
                >
                    简单
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white mr-2"
                    onClick={() => {
                        changeLevel(MID);
                    }}
                >
                    中等
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white"
                    onClick={() => {
                        changeLevel(DIF);
                    }}
                >
                    困难
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white ml-4"
                    onClick={() => {
                        // startCountdown();
                        clearInterval(intervalId);
                    }}
                >
                    clear
                </button>
            </div>
        );
    }

    function renderTimer() {
        return (
            <div className="flex flex-row justify-center items-center my-5">
                <div className="flex flex-row">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <div className="text-black-300 ml-2 mr-4">{countdown}</div>
                </div>
                <div className="flex flex-row">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="black"
                        className="w-6 h-6 bg-red-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                    </svg>
                    <div className="text-black-300 ml-2">{mineCount}</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderHeader()}
            {renderTimer()}
            <div className="flex w-auto h-auto justify-center align-middle flex-row ">
                {grids.map((v_cells: Cell[], v_index: number) => {
                    return (
                        <div key={`item_${v_index}`}>
                            {v_cells.map((_: Cell, h_index: number) => {
                                return (
                                    <CellView
                                        key={`item_${h_index}`}
                                        matrix={grids}
                                        v_index={v_index}
                                        h_index={h_index}
                                        click={click}
                                        flagClick={flagClick}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MineSweeper;
