export type Cell = {
    x: number,
    y: number,
    val: string,
    isShown: boolean,
    isFlag: boolean
}

export type Point = Omit<Cell, "val" | "isShown" | "isFlag">

function randMine(): boolean {
    return Math.random() < 0.2;
}

function isMine(cell: Cell): boolean {
    return cell.val === FLAG_MINE;
}

export const FLAG_MINE = 'X';
const FLAG_NONE = 'O';

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
            cells[y_index][x_index].val = mineCount + '';
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

export default gen;