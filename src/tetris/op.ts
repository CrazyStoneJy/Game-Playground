import { TPoint } from "../model/model";
import { contain } from "../utils/arrays";
import { Block, BlockType, TETRIS_H, TETRIS_W, isInitState } from "./block";
import { store } from "./store";


// todo all of this operation must be check range.
interface Operation {
    rotate(block: Block): Block; // 顺时针旋转90度
    down(block: Block): Block; // 下降一格
    left(block: Block): Block; //左移一格
    right(block: Block): Block; // 右移一格
}

const dirs = [
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
];
class BlockOperation implements Operation {

    // 上下对称
    transform_mirror(block: Block): Block {
        const matrix = block.points;
        let up = 0, down = matrix.length - 1;
        const len = matrix[0].length;
        console.log(block);

        while (up < down) {
            for (let i = 0; i < len; i++) {
                const _up: TPoint = matrix[up][i];
                const _down: TPoint = matrix[down][i];

                matrix[up][i] = {
                    ..._down,
                    y: _up.y,
                    x: _up.x
                };
                matrix[down][i] = {
                    ..._up,
                    y: _down.y,
                    x: _down.x
                };

            }
            up++;
            down--;
        }
        return block;
    }

    //   / 45度斜对角交换
    transform_diagonal(block: Block): Block {
        const matrix = block.points;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = i + 1; j < matrix[0].length; j++) {
                const t1: TPoint = matrix[i][j];
                const t2: TPoint = matrix[j][i];
                matrix[i][j] = {
                    ...t2,
                    y: t1.y,
                    x: t1.x
                };
                matrix[j][i] = {
                    ...t1,
                    y: t2.y,
                    x: t2.x
                };
            }
        }
        return block;
    }

    rotate(block: Block): Block {
        if (block.type === BlockType.X) {
            return block;
        }
        const isValid = block.points.flat().every((point: TPoint) => {
            return point.x >= 0 && point.x < TETRIS_W && point.y >= 0 && point.y < TETRIS_H;
        });
        if (!isValid) {
            return block;
        }
        const newBlock = this.transform_diagonal(this.transform_mirror(block));
        if (this.check(newBlock.points)) {
            return newBlock;
        }
        console.log(newBlock);
        return block;
    }

    down(block: Block): Block {
        return this.turnDir(block, dirs[0], true);
    }

    left(block: Block): Block {
        return this.turnDir(block, dirs[1]);
    }

    right(block: Block): Block {
        return this.turnDir(block, dirs[2]);
    }

    turnDir(block: Block, dir: { x: number, y: number }, isDown: boolean = false) {
        const points: TPoint[][] = block.points.map((cells: TPoint[]) => {
            return cells.map((point: TPoint) => {
                return {
                    ...point,
                    x: point.x + dir.x,
                    y: point.y + dir.y
                }
            });
        });
        if (!this.check(points)) {
            return {
                ...block,
                isDone: isDown,
                isGameOver: isInitState(block)
            };
        }
        return {
            ...block,
            points,
        }
    }

    check(points: TPoint[][]): boolean {
        const isInBoundary = points.flat().every((point: TPoint) => {
            if (point.visible) {
                return point.x >= 0 && point.x < TETRIS_W && point.y >= 0 && point.y < TETRIS_H;
            }
            return true;
        });
        const isInStore = points.flat().every((point: TPoint) => {
            if (point.visible) {
                const points = store.getMatrix().flat().filter((point: TPoint) => {
                    return point.visible;
                });
                return !contain(points, point);
            }
            return true;
        });
        return isInBoundary && isInStore;
    }

}

const op = new BlockOperation();

export default op;
