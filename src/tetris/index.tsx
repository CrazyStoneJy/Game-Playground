import { useEffect, useState } from "react";
import Board from "../components/board";
import { genBoard } from "../components/board/gen";
import { Block, L, TETRIS_H, TETRIS_W } from "./block";
import { PlayState, TPoint } from "../model/model";

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

    function updateUI() {
        // check range & collision
        const outOfRange = block.points.some((point: TPoint) => {
            return point.y >= TETRIS_H;
        })
        if (outOfRange) {
            // 
            return;
        }
        const downPoints: TPoint[] = block.points.map((point: TPoint) => {
            return {
                ...point,
                y: point.y + 1,
            };
        });
        refreshBlock({
            points: downPoints,
        });
    }

    useEffect(() => {
        if (playState < PlayState.RUNNING) {
            return;
        }
        intervalId = setInterval(() => {
            // down
            updateUI();
        }, 500);
        return () => {
            clearInterval(intervalId);
        };
    });

    useEffect(() => {
        if (grids) {
            // 清空之前的状态
            grids.flat().forEach((point: TPoint) => {
                grids[point.y][point.x].visible = false;
            });
            block.points.forEach((point: TPoint) => {
                // console.log(point);
                if (checkRange(point)) {
                    grids[point.y][point.x].visible = true;
                }
            });
            refreshGrids(grids);
        }
    }, [grids, block]);

    const start = () => {
        refreshPlayState(PlayState.RUNNING);
    };

    const stop = () => {
        refreshPlayState(PlayState.STOP);
    };

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
