import React, { useEffect, useRef, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "./board";
import { GCell, Point } from "../model/model";
import { clone } from "../base/utils";
import { next } from "./algo";

const default_grids = Array.from({ length: DEFAULT_H}, (_: number, y: number) => {
    return Array.from({ length: DEFAULT_W }, (_: number, x: number) => {
        return {
            x,
            y,
            visible: false,
            val: '*'
        };
    })
})

// console.log(default_grids);

function GameOfLife() {

    const [grids, changeGrids] = useState(default_grids);

    function start() {
        const matrix: GCell[][] = next(grids);
        changeGrids(matrix);
    }

    function reset() {
        changeGrids(default_grids);
    }

    const toggleVisible = (point: Point) => {
        const matrix: GCell[][] = clone(grids);
        const cell = matrix[point.y][point.x];
        cell.visible = !cell.visible;
        changeGrids(matrix);
    }

    return (
        <div className="flex w-auto h-auto justify-center align-middle flex-col ">
            <div className="flex flex-row h-20 w-auto justify-center items-center">
                <button className="flex flex-row mr-3" onClick={start}>start</button>
                <button onClick={reset}>reset</button>
            </div>
            <Board grids={grids} onItemClick={(point: Point) => {
                toggleVisible(point);
            }}/>
        </div>
    );
}

export default GameOfLife;