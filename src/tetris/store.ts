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

    function clear() {
        // console.log('before:', snapshot);
        for (let i = snapshot.length - 1; i >= 0; ) {
            if (!clearLine(i)) {
                i--;
            }
        }
        // console.log('after:', snapshot);
    }

    function clearLine(end: number, ): boolean {
        const isFull = snapshot[end].every((point: TPoint) => {
            return point.visible;
        });
        if (isFull) {
            // clear
            snapshot[end].forEach((_: TPoint, j: number) => {
                snapshot[end][j].visible = false;
            });
            // 小于`i`的行，全部下移一位
            const rest: TPoint[][] = snapshot.filter((_: TPoint[], index: number) => {
                return index < end;
            });
            for (let i = rest.length - 1; i >= 0; i--) {
                rest[i].forEach((_: TPoint, j: number) => {
                    snapshot[i + 1][j].visible = rest[i][j].visible;
                });
            }
            // 第一行清零
            snapshot[0].forEach((point: TPoint) => {
                snapshot[point.y][point.x].visible = false;
            });
            return true;
        } 
        return false;
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