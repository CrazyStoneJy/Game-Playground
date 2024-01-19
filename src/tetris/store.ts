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
        for (let i = snapshot.length - 1; i >= 0; i--) {
            
        }
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