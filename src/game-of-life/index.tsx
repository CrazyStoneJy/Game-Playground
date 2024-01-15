import React, { useEffect, useRef, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "../components/board";
import { GCell, Point, PointType, TPoint } from "../model/model";
import { clone } from "../utils/utils";
import { next } from "./algo";
import { genBoard } from "../components/board/gen";

// const default_grids = Array.from({ length: DEFAULT_H}, (_: number, y: number) => {
//     return Array.from({ length: DEFAULT_W }, (_: number, x: number) => {
//         return {
//             x,
//             y,
//             visible: false,
//             // val: '*',
//             type: PointType.DEFAULT
//         };
//     })
// })

// console.log(default_grids);

function GameOfLife() {

    const [grids, changeGrids] = useState(genBoard(DEFAULT_H, DEFAULT_W));
    const [playState, refreshPlayState] = useState(0);
    let intervalId: any;

    useEffect(() => {
        if (playState <= 0) {
            return;
        }
        intervalId = setInterval(() => {
            start();
        }, 200);
        return (() => {
            clearInterval(intervalId);
        });
    });

    function start() {
        const matrix: TPoint[][] = next(grids);
        changeGrids(matrix);
    }

    function autoStart() {
        refreshPlayState(1);
    }

    function stop() {
        refreshPlayState(-1);
    }

    function reset() {
        stop();
        changeGrids(genBoard(DEFAULT_H, DEFAULT_W));
    }

    const toggleVisible = (point: Point) => {
        const matrix: TPoint[][] = clone(grids);
        const cell = matrix[point.y][point.x];
        cell.visible = !cell.visible;
        changeGrids(matrix);
    }

    return (
        <div className="flex w-auto h-auto justify-center align-middle flex-col ">
            <div className="flex flex-row h-20 w-auto justify-center items-center">
                <button className="flex flex-row mr-5" onClick={start}>start</button>
                <button className="flex flex-row mr-5" onClick={autoStart}>auto-start</button>
                <button className="flex flex-row mr-5" onClick={stop}>stop</button>
                <button onClick={reset}>reset</button>
            </div>
            <Board grids={grids} onItemClick={(point: Point) => {
                toggleVisible(point);
            }}/>
        </div>
    );
}

export default GameOfLife;