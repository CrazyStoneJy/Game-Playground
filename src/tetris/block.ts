/**
 * 结构类型,如下：
 *  
 *  一字： 
 *          xxxx
 * 
 *  山型:   
 *           x
 *          xxx
 *  
 *  z型：  
 *          xx    
 *           xx
 * 
 *  田字形：  
 *          xx
 *          xx
 * 
 *  L型：   
 *          x          
 *          x
 *          xx
 */

import { Point, PointType, TPoint } from "../model/model";
import { contain } from "../utils/arrays";

export enum BlockType {
    O,
    M,
    Z,
    X,
    L
}

export const TETRIS_H = 20;
export const TETRIS_W = 10;

const MATRIX_O = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
];

const MATRIX_M = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
];

const MATRIX_Z = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
];

const MATRIX_X = [
    [1, 1],
    [1, 1]
];

const MATRIX_L = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];


export type Block = {
    points: TPoint[][];
    type: BlockType;
    isDone: boolean;
    isGameOver?: boolean;
}

const W_MID = Math.floor(TETRIS_W / 2);

const O: Block = genO();  // 一字
const M: Block = genM();  // 山型
const Z: Block = genZ();  // z型
const X: Block = genX();  // 田字型
const L: Block = genL();  // L型

const blocks: Block[] = [
    O,
    M,
    Z,
    X,
    L
];


function genO(): Block {
    return {
        points: init(MATRIX_O, W_MID),
        type: BlockType.O,
        isDone: false
    }
}

function genM(): Block {
    return {
        points: init(MATRIX_M, W_MID),
        type: BlockType.M,
        isDone: false
    }
}

function genZ(): Block {
    return {
        points: init(MATRIX_Z, W_MID),
        type: BlockType.Z,
        isDone: false
    }
}

function genX(): Block {
    return {
        points: init(MATRIX_X, W_MID),
        type: BlockType.X,
        isDone: false
    }
}

function genL(): Block {
    return {
        points: init(MATRIX_L, W_MID),
        type: BlockType.L,
        isDone: false
    }
}

function init(matrix: number[][], midX: number): TPoint[][] {
    const matrix_mid_x = Math.floor(matrix[0].length / 2);
    const start_x = (midX - matrix_mid_x);
    return matrix.map((arr: number[], y: number) => {
        return arr.map((n: number, x: number) => {
            return {
                x: start_x + x,
                y,
                visible: n === 1,
                type: PointType.DEFAULT
            }
        });
    })
}

function isEqulas(block1: Block, block2: Block): boolean {
    if (block1.type !== block2.type) {
        return false;
    }
    const points1 = block1.points.flat();
    const points2 = block2.points.flat();
    return points1.every((point: Point) => {
        return contain(points2, point);
    })
}

function isInitState(block: Block) {
    return blocks.some((b: Block) => {
        return isEqulas(b, block);
    });
}


export {
    O, M, Z, X, L, blocks, isEqulas, isInitState
}

