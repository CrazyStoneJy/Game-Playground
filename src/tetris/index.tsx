import { useEffect, useState } from "react";
import Board from "../components/board";
import { genBoard } from "../components/board/gen";
import { Block, L, O, TETRIS_H, TETRIS_W, blocks } from "./block";
import { PlayState, TPoint } from "../model/model";
import op from "./op";
import { clone } from "../utils/utils";

function Tetris() {
    const [grids, refreshGrids] = useState<TPoint[][]>(
        genBoard(TETRIS_H, TETRIS_W)
    );
    const [block, refreshBlock] = useState<Block>(L);
    const [playState, refreshPlayState] = useState(PlayState.INIT);
    let intervalId: any;

    const checkRange = (point: TPoint): boolean => {
        return (
            point.x >= 0 &&
            point.x < TETRIS_W &&
            point.y >= 0 &&
            point.y < TETRIS_H
        );
    };

    // function updateUI() {
    //     // check range & collision
    //     const outOfRange = block.points.some((point: TPoint) => {
    //         return point.y >= TETRIS_H;
    //     })
    //     if (outOfRange) {
    //         //
    //         return;
    //     }
    //     const downPoints: TPoint[] = block.points.map((point: TPoint) => {
    //         return {
    //             ...point,
    //             y: point.y + 1,
    //         };
    //     });
    //     refreshBlock({
    //         points: downPoints,
    //     });
    // }

    // useEffect(() => {
    //     if (playState < PlayState.RUNNING) {
    //         return;
    //     }
    //     intervalId = setInterval(() => {
    //         // down
    //         updateUI();
    //     }, 500);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // });

    useEffect(() => {
        refreshPlayState(PlayState.RUNNING);
    }, []);

    useEffect(() => {
        console.log(block);
        
        if (grids && block) {
            console.log("refresh grids");

            // 清空之前的状态
            grids.flat().forEach((point: TPoint) => {
                grids[point.y][point.x].visible = false;
            });
            block.points.forEach((cells: TPoint[]) => {
                cells.forEach((point: TPoint) => {
                    // todo check range
                    // if (checkRange(point)) {
                    //     grids[point.y][point.x].visible = true;
                    // }
                    if (point.visible) {
                        grids[point.y][point.x].visible = true;
                    } else {
                        grids[point.y][point.x].visible = false;
                    }
                });
            });
            console.log(clone(grids));
            
            refreshGrids(clone(grids));
        }
    }, [block]);

    const start = () => {
        refreshPlayState(PlayState.RUNNING);
    };

    const stop = () => {
        refreshPlayState(PlayState.STOP);
    };

    const show = () => {
        refreshPlayState(PlayState.RUNNING);
    };

    const rotate = () => {
        const newBlock = op.rotate(block);
        refreshBlock(clone(newBlock));
    };

    const rand = () => {
        const rand = Math.floor(Math.random() * 5);
        const newBlock = blocks[rand];
        console.log(newBlock, rand);
        
        refreshBlock(newBlock);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center my-5">
                俄罗斯方块
            </div>
            <div className="flex flex-row my-3 justify-center items-center">
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
