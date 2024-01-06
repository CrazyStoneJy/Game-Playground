import React, { useEffect, useState } from "react";
import gen, { Cell } from "./gen";

const H = 9;
const V = 9;

function MineSweeper() {
    const [grids , updateGrids] = useState([] as Cell[][]);
    useEffect(() => {
        updateGrids(gen(V, H));
    }, []);

    function renderCell(v_index: number, h_index: number) {
        return (
            <div className="flex justify-center items-center w-9 h-9 border border-cyan-200 bg-orange-400">
                {grids[v_index][h_index].val}
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
