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

export enum BlockType {
    O,
    M,
    Z,
    X,
    L
}

export const TETRIS_H = 4;
export const TETRIS_W = 4;

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
}

const W_MID = Math.floor(TETRIS_W / 2);

function genO(): Block {
    return {
        points: init(MATRIX_O, W_MID),
        type: BlockType.O
    }
}

function genM(): Block {
    return {
        points: init(MATRIX_M, W_MID),
        type: BlockType.M
    }
}

function genZ(): Block {
    return {
        points: init(MATRIX_Z, W_MID),
        type: BlockType.Z
    }
}

function genX(): Block {
    return {
        points: init(MATRIX_X, W_MID),
        type: BlockType.X
    }
}

function genL(): Block {
    return {
        points: init(MATRIX_L, W_MID),
        type: BlockType.L
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

export {
    O, M, Z, X, L, blocks
}

