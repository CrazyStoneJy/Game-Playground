import { TPoint } from "../model/model";
import { Block, BlockType } from "./block";


interface Operation {
    rotate(block: Block): Block; // 顺时针旋转90度
    down(block: Block): Block; // 下降一格
    left(blcok: Block): Block; //左移一格
    right(block: Block): Block; // 右移一格
}

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

    rotate(block: Block) {
        if (block.type === BlockType.X) {
            return block;
        }
        return this.transform_diagonal(this.transform_mirror(block));
        // return this.transform_mirror(block);
    }

    down(block: Block) {
        return block;
    }

    left(blcok: Block) {
        return blcok;
    }

    right(block: Block) {
        return block;
    }

}

const op = new BlockOperation();

export default op;
