import React, { useEffect, useRef, useState } from "react";
import gen, { Cell, isMine, show } from "./gen";
import { clone } from "../base/utils";

const H = 6;
const V = 6;

enum GameState {
    INIT = 0,
    RUNNING = INIT + 1,
    FINISHED = RUNNING + 1,
}

function MineSweeper() {
    const [grids, updateGrids] = useState([] as Cell[][]);
    const [state, setState] = useState(GameState.INIT);
    const isStartRef = useRef(false);
    const [point, updatePoint] = useState({x: -1, y: -1});

    useEffect(() => {
        updateGrids(gen(V, H));
    }, []);

    useEffect(() => {
        if (point.x !== -1 && point.y !== -1) {
            check(grids, point.x, point.y);
        }
    }, [grids]);

    const click = (x: number, y: number) => {
        if (state > GameState.RUNNING) {
            return;
        }
        updatePoint({x, y});
        if (state < GameState.RUNNING) {
            setState(GameState.RUNNING);
        }
        let clickedGrids = grids;
        if (!isStartRef.current) {
            clickedGrids = gen(V, H, { x, y });
            isStartRef.current = true;
        }
        updateGrids(show({ x, y }, clickedGrids));
    };

    function check(matrix: Cell[][], x: number, y: number) {
        // check result
        setTimeout(() => {
            if (isMine(matrix[y][x])) {
                alert("you lost");
                setState(GameState.FINISHED);
            }
            const cells = matrix.flat();
            console.log(cells);
            
            const shownCount = cells.filter(
                (cell: Cell) => cell.isShown
            ).length;
            const mineFlagCount = cells.filter(
                (cell: Cell) => isMine(cell) && cell.isFlag
            ).length;

            console.log('shownCount:', shownCount, ',mineFlagCount:', mineFlagCount);
            if (shownCount + mineFlagCount === cells.length) {
                alert("you win");
            }
        }, 0);
    }

    const flagClick = (v_index: number, h_index: number) => {
        const matrix = clone(grids);
        const cell = matrix[v_index][h_index];
        cell.isFlag = !cell.isFlag;
        updateGrids(matrix);
    };

    const debug = () => {
        const newGrids = grids.map((cells: Cell[]) => {
            return cells.map((cell: Cell) => {
                return {
                    ...cell,
                    isShown: true,
                };
            });
        });
        updateGrids(newGrids);
    };

    function background(v_index: number, h_index: number): string {
        const cell = grids[v_index][h_index];
        const { isShown } = cell;
        if (point.x === h_index && point.y === v_index && isMine(cell)) {
            return "bg-red-400";
        }
        return isShown ? "bg-white-100" : "bg-gray-100";
    }

    function renderCell(v_index: number, h_index: number) {
        const cell = grids[v_index][h_index];
        const { isShown } = cell;
        return (
            <div
                key={`x_${h_index}`}
                className={`flex justify-center items-center w-9 h-9 border border-gray-50 ${background(
                    v_index,
                    h_index
                )} hover:bg-gray-300`}
                onClick={() => click(h_index, v_index)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    flagClick(v_index, h_index);
                }}
            >
                {renderCellContent(cell)}
            </div>
        );
    }

    function renderCellContent(cell: Cell) {
        const { val, isShown, isFlag } = cell;
        if (isFlag) {
            return renderFlag();
        }
        if (isShown) {
            if (isMine(cell)) {
                return renderMine();
            }
            return isShown ? val : "";
        }
        return null;
    }

    function renderFlag() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="red"
                className="w-4 h-4"
            >
                <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
            </svg>
        );
    }

    function renderMine() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
            </svg>
        );
    }

    function reset() {
        setState(GameState.INIT);
        updateGrids(gen(V, H));
        isStartRef.current = false;
    }

    return (
        <div>
            <div className="flex flex-row justify-center items-center">
                <div
                    className="flex justify-center m-5"
                    onClick={() => {
                        debug();
                    }}
                >
                    debug
                </div>
                <div
                    className="flex justify-center m-5"
                    onClick={() => {
                        reset();
                    }}
                >
                    reset
                </div>
            </div>
            <div className="flex w-auto h-auto justify-center align-middle flex-row ">
                {grids.map((v_cells: Cell[], v_index: number) => {
                    return (
                        <div key={`item_${v_index}`}>
                            {v_cells.map((cell: Cell, h_index: number) => {
                                return renderCell(v_index, h_index);
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MineSweeper;
