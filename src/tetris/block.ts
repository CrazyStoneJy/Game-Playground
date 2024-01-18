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

import { PointType, TPoint } from "../model/model";

export enum BlockType {
    O,
    M,
    Z,
    X,
    L
}

export const TETRIS_H = 4;
export const TETRIS_W = 4;


export type Block = {
    points: TPoint[];
    anchor?: TPoint;
    type: BlockType;
    // todo boundary
}

const W_MID = Math.floor(TETRIS_W / 2);

function genO(): Block {
    const points: TPoint[] = [];
    points.push({ x: W_MID - 2, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID - 1, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID + 1, y: 0, visible: true, type: PointType.DEFAULT });
    return {
        points: move_down(points),
        type: BlockType.O
    }
}

function genM(): Block {
    const points: TPoint[] = [];
    points.push({ x: W_MID, y: -1, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID - 1, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID + 1, y: 0, visible: true, type: PointType.DEFAULT });
    return {
        points: move_down(points),
        type: BlockType.M
    }
} 

function genZ(): Block {
    const points: TPoint[] = [];
    points.push({ x: W_MID - 1, y: -1, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: -1, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID + 1, y: 0, visible: true, type: PointType.DEFAULT });
    return {
        points: move_down(points),
        type: BlockType.Z
    }
} 

function genX(): Block {
    const points: TPoint[] = [];
    points.push({ x: W_MID - 1, y: -1, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: -1, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID - 1, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID, y: 0, visible: true, type: PointType.DEFAULT });
    return {
        points: move_down(points),
        type: BlockType.X
    }
} 

function genL(): Block {
    const points: TPoint[] = [];
    const anchor = { x: W_MID , y: -1, visible: true, type: PointType.DEFAULT };
    points.push({ x: W_MID , y: -2, visible: true, type: PointType.DEFAULT });
    points.push(anchor);
    points.push({ x: W_MID, y: 0, visible: true, type: PointType.DEFAULT });
    points.push({ x: W_MID + 1, y: 0, visible: true, type: PointType.DEFAULT });
    return {
        points: move_down(points, 2),
        anchor,
        type: BlockType.L
    }
} 

function move_down(points: TPoint[], n: number = 1): TPoint[] {
    return points.map((point: TPoint) => {
        return {
            ...point,
            y: point.y + n
        }
    });
}

function rotate90(points: TPoint[]): TPoint[] {
    return points;
}

export const O: Block = genO();  // 一字
export const M: Block = genM();  // 山型
export const Z: Block = genZ();  // z型
export const X: Block = genX();  // 田字型
export const L: Block = genL();  // L型

