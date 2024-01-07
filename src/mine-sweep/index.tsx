import React, { useEffect, useRef, useState } from "react";
import gen, { Cell, isMine, show } from "./gen";
import { clone } from "../base/utils";
import CellView from "./cell";
import { DIF, EASY, MID } from "./level";

// const H = 6;
// const V = 6;

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
    

    useEffect(() => {
        updateGrids(gen(level.v, level.h));
    }, []);

    useEffect(() => {
        if (point.x !== -1 && point.y !== -1) {
            check(grids, point.x, point.y);
        }
    }, [grids]);

    useEffect(() => {
        updateGrids(gen(level.v, level.h));
    }, [level]);

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
            clickedGrids = gen(level.v, level.h, { x, y });
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
            const shownCount = cells.filter(
                (cell: Cell) => cell.isShown
            ).length;
            const mineFlagCount = cells.filter(
                (cell: Cell) => isMine(cell) && cell.isFlag
            ).length;
            if (shownCount + mineFlagCount === cells.length) {
                alert("you win");
            }
        }, 100);
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

    function reset() {
        setState(GameState.INIT);
        updateGrids(gen(level.v, level.h));
        isStartRef.current = false;
    }

    function renderHeader() {
        return (
            <div className="flex flex-row justify-center items-center my-5">
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
                        refreshLevel(EASY);
                    }}
                >
                    简单
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white mr-2"
                    onClick={() => {
                        refreshLevel(MID);
                    }}
                >
                    中等
                </button>
                <button
                    className="flex justify-center items-center h-8 w-16 rounded-md bg-blue-400 hover:bg-blue-200 text-white"
                    onClick={() => {
                        refreshLevel(DIF);
                    }}
                >
                    困难
                </button>
            </div>
        );
    }
    return (
        <div>
            {renderHeader()}
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
                                        clickPoint={point}
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
