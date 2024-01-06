import React, { useEffect, useRef, useState } from "react";
import gen, { Cell } from "./gen";
import { clone } from "../base/utils";

const H = 9;
const V = 9;

function MineSweeper() {
    const [grids, updateGrids] = useState([] as Cell[][]);
    const isFristRef = useRef(false);

    useEffect(() => {
        updateGrids(gen(V, H));
    }, []);

    const click = (x: number, y: number) => {
        let clickedGrids = grids;
        if (!isFristRef.current) {
            clickedGrids = gen(V, H, {x, y});
            isFristRef.current = true;
        }
        
        clickedGrids[y][x].isShown = true;
        updateGrids(clone(clickedGrids));
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

    function renderCell(v_index: number, h_index: number) {
        const cell = grids[v_index][h_index];
        const { val, isShown } = cell;
        return (
            <div
                className="flex justify-center items-center w-9 h-9 border border-white bg-gray-100 hover:bg-gray-300"
                onClick={() => click(h_index, v_index)}
            >
                {isShown ? val : ""}
            </div>
        );
    }

    return (
        <div>
            <div
                className="flex justify-center m-5"
                onClick={() => {
                    debug();
                }}
            >
                debug
            </div>
            <div className="flex w-auto h-auto justify-center align-middle flex-row">
                {grids.map((v_cells: Cell[], v_index: number) => {
                    return (
                        <div>
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
