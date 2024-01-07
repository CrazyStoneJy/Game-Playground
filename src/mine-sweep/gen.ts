import { clone } from "../base/utils";

export type Cell = {
    x: number,
    y: number,
    val: string,
    isShown: boolean,
    isFlag: boolean
}

export type Point = Omit<Cell, "val" | "isShown" | "isFlag">

export const FLAG_MINE = 'X';
const FLAG_NONE = 'O';
const FLAG_ZERO = '';

/**
 * eight direction
 * [ up-left ,  up  , up-right]
 * [   left  , self ,  right  ]
 * [down-left, down , down-right]
 */
const dirs = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
];

function randMine(): boolean {
    return Math.random() < 0.2;
}

function isMine(cell: Cell): boolean {
    return cell && cell.val === FLAG_MINE;
}

function genGrid(v: number, h: number, start?: Point): Cell[][] {
    // first click 
    // 在点击开始的周围，不能有雷
    let surroundings: Point[] = [];
    if (start) {
        surroundings = getSurroundings(start, v, h);
        // apend self
        surroundings.push(start);
        console.log(surroundings);
    }
    return Array.from({ length: v }, (v_val: number, v_index: number) => {
        return Array.from({ length: h }, (h_val: number, h_index) => {
            // init grid
            let val = FLAG_NONE;
            if (!start) {
                return {
                    x: h_index,
                    y: v_index,
                    val,
                    isShown: false,
                    isFlag: false
                };
            }

            if (!contain(surroundings, { x: h_index, y: v_index })) {
                val = randMine() ? FLAG_MINE : FLAG_NONE;
            }
            return {
                x: h_index,
                y: v_index,
                val,
                isShown: false,
                isFlag: false
            };
        });
    })
}

function contain(points: Point[], point: Point) {
    return points.some((p: Point) => {
        return p.x === point.x && p.y === point.y;
    });
}

function getSurroundings(point: Point, v: number, h: number): Point[] {
    let surroundings: Point[] = [];
    dirs.forEach((dir: { x: number, y: number }) => {
        const x = point.x + dir.x;
        const y = point.y + dir.y;
        if (x < 0 || y < 0 || y >= v || x >= h) {
            return;
        }
        surroundings.push({ x, y });
    })
    return surroundings;
}

function genSurroundings(cells: Cell[][]) {
    const V = cells.length;
    const H = cells[0].length;
    cells.forEach((y_val: Cell[], y_index: number) => {
        y_val.forEach((cell: Cell, x_index: number) => {
            // is not mine
            if (isMine(cell)) {
                return;
            }
            // traverse eight direction
            let mineCount = 0;
            dirs.forEach((dir: { x: number, y: number }, _: number) => {
                // check out of range wether or not.
                let last_x = x_index;
                let last_y = y_index;
                let { x, y } = dir;
                last_x += x;
                last_y += y;
                if (last_x < 0 || last_y < 0 || last_y >= V || last_x >= H) {
                    return;
                }
                if (cells[last_y][last_x].val === FLAG_MINE) {
                    mineCount++;
                }
            });
            cells[y_index][x_index].val = mineCount > 0 ? (mineCount + '') : '';
        });
    })
}

function gen(v: number, h: number, start?: Point): Cell[][] {
    const cells: Cell[][] = genGrid(v, h, start);
    if (start) {
        genSurroundings(cells);
    }
    return cells;
}

function show(point: Point, cells: Cell[][]): Cell[][] {
    const matrix = clone(cells);
    const cell = matrix[point.y][point.x];
    // 如果点中地雷，则将其他雷也全部展示
    if (isMine(cell)) {
        matrix.flat().forEach((_cell: Cell) => {
            if (isMine(_cell)) {
                _cell.isShown = true;
                _cell.isFlag = false;
            }
        })
        return matrix;
    }
    // console.log(cell);
    if (cell.val === FLAG_ZERO) {
        expand(point, matrix);
        return matrix;
    } 
    cell.isShown = true;
    return matrix;
}

function expand(point: Point, martix: Cell[][]) {
    const V = martix.length;
    const H = martix[0].length;
    const points: Point[] = getSurroundings(point, V, H);
    points.forEach((p: Point) => {
        const cell = martix[p.y][p.x];
        if (cell.val === FLAG_MINE || cell.isShown) {
            return;
        }
        cell.isShown = true;
        if (martix[p.y][p.x].val === FLAG_ZERO) {
            expand(p, martix);
        }
    });
}

export default gen;
export {
    show,
    isMine
}