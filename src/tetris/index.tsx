import { useEffect, useState } from "react";
import Board from "../components/board";
import { genBoard } from "../components/board/gen";
import { Block, L, O, TETRIS_H, TETRIS_W, blocks } from "./block";
import { PlayState, TPoint } from "../model/model";
import op from "./op";
import { clone } from "../utils/utils";
import { store } from "./store";

function Tetris() {
    const [grids, refreshGrids] = useState<TPoint[][]>(
        genBoard(TETRIS_H, TETRIS_W)
    );
    const [block, refreshBlock] = useState<Block>(L);
    const [playState, refreshPlayState] = useState(PlayState.INIT);
    let intervalId: any;

    useEffect(() => {
        if (playState < PlayState.RUNNING) {
            return;
        }
        intervalId = setInterval(() => {
            down();
        }, 200);
        return () => {
            clearInterval(intervalId);
        };
    });

    useEffect(() => {
        refreshPlayState(PlayState.RUNNING);
    }, []);

    useEffect(() => {
        if (grids && block) {
            // console.log(block);
            // 清空之前的状态
            grids.flat().forEach((point: TPoint) => {
                grids[point.y][point.x].visible = false;
            });
            // show store
            store.getMatrix().flat().forEach((point: TPoint) => {
                grids[point.y][point.x].visible = point.visible;
            })
            block.points.forEach((cells: TPoint[]) => {
                cells.forEach((point: TPoint) => {
                    if (point.visible && grids[point.y][point.x]) {
                        grids[point.y][point.x].visible = true;
                    } 
                });
            });
            refreshGrids(clone(grids));
        }
    }, [block]);

    const start = () => {
        refreshGrids(genBoard(TETRIS_H, TETRIS_W));
        store.reset();
        rand();
        refreshPlayState(PlayState.RUNNING);
    };

    const stop = () => {
        refreshPlayState(PlayState.STOP);
    };

    const rotate = () => {
        const newBlock = op.rotate(block);
        refreshBlock(clone(newBlock));
    };

    const rand = () => {
        const rand = Math.floor(Math.random() * 5);
        const newBlock = blocks[rand];
        refreshBlock(newBlock);
    }

    const left = () => {
        refreshBlock(clone(op.left(block)));
    }

    const right = () => {
        refreshBlock(clone(op.right(block)));
    }

    const down = () => {
        const newBlock = clone(op.down(block));
        const { isDone, isGameOver } = newBlock;
        if (isGameOver) {
            stop();
            alert('you are lost!');
        }
        if (isDone) {
            store.save(newBlock);
            rand();
            return;
        }
        refreshBlock(newBlock);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center mb-3">
                俄罗斯方块
            </div>
            <div className="flex flex-row justify-center items-center">
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={start}
                >
                    start
                </div>
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={rand}
                >
                    random
                </div>
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={rotate}
                >
                    rotate
                </div>
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={left}
                >
                    left
                </div>
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={right}
                >
                    right
                </div>
                <div
                    className="flex flex-row mx-3 justify-center items-center"
                    onClick={down}
                >
                    down
                </div>
                <div
                    className="flex flex-row my-3 justify-center items-center"
                    onClick={stop}
                >
                    stop
                </div>
            </div>

            <Board grids={grids} />
        </div>
    );
}

export default Tetris;
