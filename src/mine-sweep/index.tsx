import React, { useEffect, useState } from "react";
import gen, { Cell } from "./gen";
import { clone } from "../base/utils";

const H = 9;
const V = 9;

function MineSweeper() {

    const [grids , updateGrids] = useState([] as Cell[][]);

    useEffect(() => {
        updateGrids(gen(V, H));
    }, []);

    const click = (x: number, y: number) => {
        grids[y][x].isShown = true;
        updateGrids(clone(grids));
    }

    function renderCell(v_index: number, h_index: number) {
        const cell = grids[v_index][h_index];
        const { val, isShown } = cell;
        return (
            <div className="flex justify-center items-center w-9 h-9 border border-white bg-gray-100 hover:bg-gray-300" onClick={() => click(h_index, v_index)}>
                {isShown ? val : ''}
            </div>
        );
    }

    return (
        <div className="flex w-auto h-auto justify-center align-middle">
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
    );
}

export default MineSweeper;
