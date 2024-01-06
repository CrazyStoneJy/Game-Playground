export type Cell = {
    x: number,
    y: number,
    val: string,
    isShown: boolean,
    isFlag: boolean
}

function randMine(): boolean {
    return Math.random() < 0.1;
}

function isMine(cell: Cell): boolean {
    return cell.val === FLAG_MINE;
}

export const FLAG_MINE = 'X';
const FLAG_NONE = 'O';

function genGrid(v: number, h: number): Cell[][] {
    return Array.from({ length: v }, (v_val: number, v_index: number) => {
        return Array.from({ length: h }, (h_val: number, h_index) => {
            const val = randMine() ? FLAG_MINE : FLAG_NONE;
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
            dirs.forEach((dir: {x: number, y: number}, _: number) => {
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

function gen(v: number, h: number): Cell[][] {
    const cells: Cell[][] = genGrid(v, h);
    genSurroundings(cells);
    return cells;
}

export default gen;