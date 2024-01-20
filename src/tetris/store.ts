import { genBoard } from "../components/board/gen";
import { Point, TPoint } from "../model/model";
import { contain } from "../utils/arrays";
import { Block, TETRIS_H, TETRIS_W } from "./block";

// 存储已经落地方块的坐标
function storeManager() {

    let snapshot: TPoint[][] = genBoard(TETRIS_H, TETRIS_W);
     
    function save(block: Block) {
        block.points.flat().forEach((point: TPoint) => {
            if (point.visible) {
                snapshot[point.y][point.x].visible = true;
            }
        });
        clear();
    }

    // todo
    function clear() {
        console.log('before:', snapshot);
        for (let i = snapshot.length - 1; i >= 0; ) {
            const isFull = snapshot[i].every((point: TPoint) => {
                return point.visible;
            });
            if (isFull) {
                // clear
                snapshot[i].forEach((point: TPoint, j: number) => {
                    snapshot[i][j].visible = false;
                });
                // 小于`i`的行，全部下移一位
                snapshot.filter((_: TPoint[], index: number) => {
                    return index <= i;
                }).flat().forEach((point: TPoint) => {
                    snapshot[point.y][point.x] = {
                        ...point,
                        y: point.y + 1
                    }
                });
            } else {
                i--;
            }
        }
        console.log('after:', snapshot);
    }
    
    function reset() {
        snapshot.splice(0, snapshot.length);
        snapshot = genBoard(TETRIS_H, TETRIS_W);
    }

    function getMatrix(): TPoint[][] {
        return snapshot;
    }


    return {
        save,
        reset,
        getMatrix
    }

}

const store = storeManager();

export {
    store
}