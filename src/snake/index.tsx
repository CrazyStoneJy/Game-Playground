import { useEffect, useMemo, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "../game-of-life/board";
import { SPoint, VPoint } from "../model/model";
import { initSnake, run } from "./algo";
import { clone } from "../base/utils";
import { DEFAULT_SNAKE_H, DEFAULT_SNAKE_W, SnakeEnity } from "./model";
import { change, mask_d, mask_l, mask_r, mask_u } from "./direction";

enum PlayState {
    DEFAULT = -2,
    STOP = -1,
    INIT = 0,
    RUNNING = INIT + 1,
    PAUSE = RUNNING + 1,
    RESUME = PAUSE + 1,
}

const default_grids = Array.from(
    { length: DEFAULT_SNAKE_H },
    (_: number, y: number) => {
        return Array.from(
            { length: DEFAULT_SNAKE_W },
            (_: number, x: number) => {
                return {
                    x,
                    y,
                    visible: false,
                };
            }
        );
    }
);

function Snake() {
    const [grids, changeGrids] = useState(default_grids);
    const [snake, refreshSnake] = useState<SnakeEnity>(initSnake(grids));
    const [playState, changePlayState] = useState(PlayState.DEFAULT);
    let intervalId: any;

    useEffect(() => {
        changePlayState(PlayState.INIT);
        init();
    }, []);

    function init() {
        updateUI();
    }

    function updateUI() {
        const matrix: VPoint[][] = clone(grids);
        const { head, isAlive } = snake || {};
        if (!isAlive) {
            alert("you are lost!");
            return;
        }
        if (head) {
            matrix[head.y][head.x].visible = true;
        }
        snake?.body.forEach((point: SPoint) => {
            matrix[point.y][point.x].visible = true;
        });
        changeGrids(matrix);
    }

    useEffect(() => {
        const { isAlive } = snake;
        // @ts-ignore
        if (playState !== PlayState.RUNNING || !isAlive) {
            return;
        }
        intervalId = setInterval(() => {
            refreshSnake(run(snake, grids));
        }, 100);
        return () => {
            clearInterval(intervalId);
        };
    });

    useEffect(() => {
        updateUI();
    }, [snake]);

    function start() {
        changePlayState(PlayState.RUNNING);
    }

    function stop() {
        changePlayState(PlayState.STOP);
    }

    function up() {
        const { dir } = snake;
        snake.dir = change(dir, mask_u);
        console.log(snake);
        refreshSnake(snake);
    }

    function down() {
        const { dir } = snake;
        snake.dir = change(dir, mask_d);
        console.log(snake);
        refreshSnake(snake);
    }

    function left() {
        const { dir } = snake;
        snake.dir = change(dir, mask_l);
        console.log(snake);
        refreshSnake(snake);
    }

    function right() {
        const { dir } = snake;
        snake.dir = change(dir, mask_r);
        console.log(snake);
        refreshSnake(snake);
    }

    return (
        <div
            id="snake_container"
            tabIndex={0}
            onKeyDown={(event: any) => {
                const keyName = event.key;
                if (keyName === "w") {
                    up();
                } else if (keyName === "s") {
                    down();
                } else if (keyName === "a") {
                    left();
                } else if (keyName === "d") {
                    right();
                }
                if (keyName === "r") {
                    start();
                }
            }}
        >
            <div className="flex flex-row mb-10 justify-center items-center text-2xl">
                贪吃蛇
            </div>
            <div className="flex flex-row justify-center items-center mb-4">
                <button className="mr-3" onClick={start}>
                    {" "}
                    start{" "}
                </button>
                <button className="mr-3" onClick={up}>
                    {" "}
                    up{" "}
                </button>
                <button className="mr-3" onClick={down}>
                    {" "}
                    down{" "}
                </button>
                <button className="mr-3" onClick={left}>
                    {" "}
                    left{" "}
                </button>
                <button className="mr-3" onClick={right}>
                    {" "}
                    right{" "}
                </button>
                <button onClick={stop}> stop </button>
            </div>
            <Board grids={grids} />
        </div>
    );
}

export default Snake;
