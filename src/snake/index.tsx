import { useEffect, useMemo, useRef, useState } from "react";
import Board, { DEFAULT_H, DEFAULT_W } from "../components/board";
import { PointType, SPoint, TPoint, VPoint } from "../model/model";
import { genFood, initSnake, run } from "./algo";
import { clone } from "../utils/utils";
import { DEFAULT_SNAKE_H, DEFAULT_SNAKE_W, SnakeEnity } from "./model";
import { change, mask_d, mask_l, mask_r, mask_u } from "./direction";
import { genBoard } from "../components/board/gen";

enum PlayState {
    DEFAULT = -2,
    STOP = -1,
    INIT = 0,
    RUNNING = INIT + 1,
    PAUSE = RUNNING + 1,
    RESUME = PAUSE + 1,
}

function Snake() {
    const [grids, changeGrids] = useState(genBoard(DEFAULT_H, DEFAULT_W));
    const [snake, refreshSnake] = useState<SnakeEnity>(initSnake(grids));
    const [food, refreshFood] = useState<TPoint | null>(null);
    const lastFood = useRef<TPoint | null>(null);
    const hasFood = useRef(false);
    const foodBufferCount = useRef(0);
    const [playState, changePlayState] = useState(PlayState.DEFAULT);
    let intervalId: any;

    useEffect(() => {
        changePlayState(PlayState.INIT);
        init();
    }, []);

    function init() {
        updateUI();
    }

    useEffect(() => {
        document.getElementById('snake_container')?.focus();
    }, []);

    function updateUI() {
        const matrix: TPoint[][] = clone(grids);
        const { head, isAlive } = snake || {};
        if (!isAlive) {
            alert("you are lost!");
            return;
        }
        // console.log(snake);

        if (head) {
            matrix[head.y][head.x].visible = true;
        }
        snake?.body.forEach((point: SPoint) => {
            matrix[point.y][point.x].visible = true;
        });
        if (food) {
            matrix[food.y][food.x].visible = true;
            matrix[food.y][food.x].type = PointType.FOOD;
            lastFood.current = food;
        } else {
            if (lastFood.current) {
                matrix[lastFood.current.y][lastFood.current.x].visible = true;
                matrix[lastFood.current.y][lastFood.current.x].type =
                    PointType.SNAKE;
            }
        }
        changeGrids(matrix);
    }

    useEffect(() => {
        const { isAlive } = snake;
        // @ts-ignore
        if (playState !== PlayState.RUNNING || !isAlive) {
            return;
        }
        intervalId = setInterval(() => {
            const _snake: SnakeEnity = run(snake, grids, food);
            const { eaten } = _snake;
            refreshSnake(_snake);

            if (eaten && food) {
                console.log("has eaten:", food);
                refreshFood(null);
                hasFood.current = false;
                foodBufferCount.current = 0;
            }

            // generate food
            if (!hasFood.current && foodBufferCount.current > 2) {
                const _food = genFood(grids, snake);
                console.log("refresh food ", _food);
                refreshFood(_food);
                hasFood.current = true;
                foodBufferCount.current = 0;
            }
            foodBufferCount.current += 1;
        }, 300);
        return () => {
            clearInterval(intervalId);
        };
    });

    useEffect(() => {
        updateUI();
    }, [snake, food]);

    useEffect(() => {
        start();
    }, []);

    function start() {
        changePlayState(PlayState.RUNNING);
    }

    function stop() {
        changePlayState(PlayState.STOP);
    }

    function up() {
        const { dir } = snake;
        snake.dir = change(dir, mask_u);
        // console.log(snake);
        refreshSnake(snake);
    }

    function down() {
        const { dir } = snake;
        snake.dir = change(dir, mask_d);
        // console.log(snake);
        refreshSnake(snake);
    }

    function left() {
        const { dir } = snake;
        snake.dir = change(dir, mask_l);
        // console.log(snake);
        refreshSnake(snake);
    }

    function right() {
        const { dir } = snake;
        snake.dir = change(dir, mask_r);
        // console.log(snake);
        refreshSnake(snake);
    }

    return (
        <>
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
                    if (keyName === "q") {
                        stop();
                    }
                }}
            >
                <div className="flex flex-row mb-5 justify-center items-center text-2xl">
                    贪吃蛇
                </div>
                <div className="flex flex-row mb-3 justify-center items-center text-xs">
                    按R键开始，Q键停止，方向： [W: 上, S: 下, A: 左, D: 右]
                </div>
                <Board grids={grids} />
            </div>
        </>
    );
}

export default Snake;
