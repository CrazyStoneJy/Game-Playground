export type Cell = {
    x: number,
    y: number,
    val: string,
    visible: boolean,
    isFlag: boolean
}

export type GCell = Omit<Cell, "isFlag">;

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