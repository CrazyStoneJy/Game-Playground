import { useEffect, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "../game-of-life/board";
import { GCell } from "../model/model";
import { init } from "./algo";

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
            visible: false,
            val: '*'
        };
    })
})

function Snake() {

    const [grids, changeGrids] = useState(default_grids);
    const [playState, changePlayState] = useState(PlayState.DEFAULT);
    let intervalId: any;

    useEffect(() => {
        const matrix: GCell[][] = init(grids);
        changeGrids(matrix);
        changePlayState(PlayState.INIT);
    }, []);

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

    return (
        <div>
            <div className="flex flex-row mb-10 justify-center items-center text-2xl">贪吃蛇</div>
            <div className="flex flex-row justify-center items-center">
                <button className="mr-3" onClick={start}> start </button>
                <button onClick={stop}> stop </button>
            </div>
            <Board grids={grids}/>
        </div>
    );
}

export default Snake;