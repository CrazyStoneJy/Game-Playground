import React, { useEffect, useRef, useState } from "react";
import gen, { Cell, isMine, show } from "./gen";
import { clone } from "../base/utils";
import CellView from "./cell";

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
    const [point, updatePoint] = useState({ x: -1, y: -1 });

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
        updatePoint({ x, y });
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

            console.log(
                "shownCount:",
                shownCount,
                ",mineFlagCount:",
                mineFlagCount
            );
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

    function reset() {
        setState(GameState.INIT);
        updateGrids(gen(V, H));
        isStartRef.current = false;
    }

    function renderHeader() {
        return (
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
