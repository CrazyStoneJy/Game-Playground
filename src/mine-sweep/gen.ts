import { clone } from "../utils/utils";
import { Cell, Point, dirs } from "../model/model";
import { Level } from "./level";


export const FLAG_MINE = 'X';
const FLAG_NONE = 'O';
const FLAG_ZERO = '';

function genMine(matrix: Cell[][], level: Level, start?: Point): Cell[][] {
    if (!start) {
        return matrix;
    }
    // 在点击开始的周围，不能有雷
    let surroundings: Point[] = [];
    surroundings = getSurroundings(start, level.v, level.h);
    // apend self
    surroundings.push(start);

    // gen mine
    const rawCells = matrix.flat();
    const cells = rawCells.filter((cell: Cell) => {
        return !contain(surroundings, {x: cell.x, y: cell.y});
    });
    console.log(rawCells);
    console.log(surroundings);
    console.log(cells);
    
    randMine(cells, level.mineCount);
    return matrix;
}

function contain(points: Point[], point: Point): boolean {
    return points.some((p: Point) => {
        return p.x === point.x && p.y === point.y;
    });
}

function randMine(cells: Cell[], count: number) {
    while (count > 0) {
        const index = Math.floor(Math.random() * cells.length);
        console.log('index:', index);
        
        if (cells[index].val !== FLAG_MINE) {
            cells[index].val = FLAG_MINE;
            --count;
        }
    }
}

function isMine(cell: Cell): boolean {
    return cell && cell.val === FLAG_MINE;
}

function genGrid(level: Level, start?: Point): Cell[][] {
    const matrix = Array.from({ length: level.v }, (v_val: number, v_index: number) => {
        return Array.from({ length: level.h }, (h_val: number, h_index) => {
            return {
                x: h_index,
                y: v_index,
                val: FLAG_NONE,
                visible: false,
                isFlag: false
            };
        });
    });
    return genMine(matrix, level, start);
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

function gen(level: Level, start?: Point): Cell[][] {
    const cells: Cell[][] = genGrid(level, start);
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
                _cell.visible = true;
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
    cell.visible = true;
    return matrix;
}

function expand(point: Point, martix: Cell[][]) {
    const V = martix.length;
    const H = martix[0].length;
    martix[point.y][point.x].visible = true;
    const points: Point[] = getSurroundings(point, V, H);
    points.forEach((p: Point) => {
        const cell = martix[p.y][p.x];
        if (cell.val === FLAG_MINE || cell.visible) {
            return;
        }
        cell.visible = true;
        if (martix[p.y][p.x].val === FLAG_ZERO) {
            expand(p, martix);
        }
    });
}

function getUnmarkedMineCount(matrix: Cell[][]): number {
    const mineCount = matrix.flat().filter((cell: Cell) => isMine(cell)).length;
    const markedCount: number = matrix.flat().filter((cell: Cell) => cell.isFlag).length;
    return mineCount - markedCount > 0 ? mineCount - markedCount : 0;
}


export default gen;
export {
    show,
    isMine,
    getUnmarkedMineCount
}