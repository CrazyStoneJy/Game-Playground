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
    const [block, refreshBlock] = useState<Block>(blocks[Math.floor(Math.random() * 5)]);
    const [playState, refreshPlayState] = useState(PlayState.INIT);
    let intervalId: any;

    useEffect(() => {
        if (playState < PlayState.RUNNING) {
            return;
        }
        intervalId = setInterval(() => {
            down();
        }, 400);
        return () => {
            clearInterval(intervalId);
        };
    });

    useEffect(() => {
        document.getElementById('container')?.focus();
    }, []);

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
        <div className="flex flex-col" id='container' tabIndex={0} onKeyDown={(event) => {
            switch (event.key) {
                case 'q':
                    stop();
                    return;
                case 'e':
                    start();
                    return;
                case 'r':
                    rotate();
                    return;
                case 'a':
                    left();
                    return;
                case 'd':
                    right();
                    return;
                case 's':
                    down();
                    return;  
            }
        }}>
            <div className="flex flex-row justify-center items-center mb-3">
                俄罗斯方块
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                    Q键停止，方向： [ S: 下, A: 左, D: 右], R: 旋转
                </div>
                
            </div>
            <div className="flex flex-row my-5 justify-center">
                <div>
                    <Board grids={grids} />
                </div>
                <div className="flex flex-row mx-10 w-28 h-28 justify-center items-center">
                    <Board grids={block.points} />
                </div>
            </div>
            
        </div>
    );
}

export default Tetris;
