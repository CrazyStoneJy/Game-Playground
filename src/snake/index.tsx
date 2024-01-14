import { useEffect, useMemo, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "../game-of-life/board";
import { SPoint } from "../model/model";
import { initSnake } from "./algo";
import { clone } from "../base/utils";
import { SnakeEnity } from "./model";

enum PlayState {
    DEFAULT = -2,
    STOP = -1,
    INIT = 0,
    RUNNING = INIT + 1,
    PAUSE = RUNNING + 1,
    RESUME = PAUSE + 1,
}

const default_grids = Array.from({ length: DEFAULT_H}, (_: number, y: number) => {
    return Array.from({ length: DEFAULT_W }, (_: number, x: number) => {
        return {
            x,
            y,
            visible: false
        };
    })
})

function Snake() {

    const [grids, changeGrids] = useState(default_grids);
    const [snake, refreshSnake] = useState<SnakeEnity>(initSnake(grids));
    const [playState, changePlayState] = useState(PlayState.DEFAULT);
    let intervalId: any;

    useEffect(() => {
        changePlayState(PlayState.INIT);
        console.log('init');
        init();
    }, []);

    function init() {
        updateUI();
    }

    function updateUI() {
        const matrix: SPoint[][] = clone(grids);
        snake?.body.forEach((point: SPoint) => {
            matrix[point.y][point.x].visible = true;
        });
        changeGrids(matrix);
    }

    useEffect(() => {
        // @ts-ignore
        if (playState !== PlayState.RUNNING || playState !== PlayState.RESUME) {
            return;
        }
        intervalId = setInterval(() => {
            console.log('run animation');
        }, 50);
        return (() => {
            clearInterval(intervalId);
        })
    });

    function start() {

    }

    function stop() {

    }

    function up() {

    }

    function down() {

    }

    function left() {

    }

    function right() {

    }

    return (
        <div>
            <div className="flex flex-row mb-10 justify-center items-center text-2xl">贪吃蛇</div>
            <div className="flex flex-row justify-center items-center mb-4">
                <button className="mr-3" onClick={start}> start </button>
                <button className="mr-3" onClick={up}> up </button>
                <button className="mr-3" onClick={down}> down </button>
                <button className="mr-3" onClick={left}> left </button>
                <button className="mr-3" onClick={right}> right </button>
                <button onClick={stop}> stop </button>
            </div>
            <Board grids={grids}/>
        </div>
    );
}

export default Snake;