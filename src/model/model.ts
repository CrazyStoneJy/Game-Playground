export type Cell = {
    x: number,
    y: number,
    val: string,
    visible: boolean,
    isFlag: boolean
}

export type GCell = Omit<Cell, "isFlag">;

export type SDir = {
    cur_dir: number
}

// 点的类型
export enum PointType {
    SNAKE,
    FOOD,
    DEFAULT
}

export type SType = {
    type: PointType
}

export type VPoint = Omit<Cell, "val" | "isFlag">;

export type TPoint = VPoint & SType;

export type SPoint = TPoint & SDir;

export type Point = Omit<Cell, "val" | "visible" | "isFlag">;

/**
 * eight direction
 * [ up-left ,  up  , up-right]
 * [   left  , self ,  right  ]
 * [down-left, down , down-right]
 */
export const dirs = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
];

export const dirs_four = [
    {x: 0 , y : -1},
    {x: 0 , y : 1},
    {x: -1 , y : 0},
    {x: 1 , y : 0}
];