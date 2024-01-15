import { clone } from "../base/utils";
import { GCell, TPoint, dirs } from "../model/model";

function next(grids: TPoint[][]): TPoint[][] {
    const matrix: TPoint[][] = clone(grids);
    grids.forEach((cells: TPoint[], h_index: number) => {
        cells.forEach((_: TPoint, w_index: number) => {
            const cell: TPoint = matrix[h_index][w_index];
            const neighbors: TPoint[] = getNeighbors(cell, grids);
            if (cell.visible) {
                matrix[h_index][w_index] = canAlive(cell, neighbors);
            } else {
                matrix[h_index][w_index] = d2alive(cell, neighbors);
            }
        });
    });
    return matrix;
}

function d2alive(cell: TPoint, neighbors: TPoint[]): TPoint {
    const cells: TPoint[] = neighbors.filter((cell: TPoint) => {
        return cell.visible;
    });
    if (cells.length === 3) {
        cell.visible = true;
    }
    return cell;
}

function canAlive(cell: TPoint, neighbors: TPoint[]): TPoint {
    const cells: TPoint[] = neighbors.filter((cell: TPoint) => {
        return cell.visible;
    });
    const len = cells.length;
    if (len < 2) {
        cell.visible = false;
    } else if (len >= 2 && len <= 3) {
        cell.visible = true;
    } else {
        cell.visible = false;
    }
    return cell;
}

function getNeighbors(cell: TPoint, grids: TPoint[][]): TPoint[] {
    const h = grids.length;
    const w = grids[0].length;
    let neighbors: TPoint[] = [];
    dirs.forEach((dir: {x: number, y: number}) => {
        const x = cell.x + dir.x;
        const y = cell.y + dir.y;
        // check range
        if (x < 0 || x >= w || y < 0 || y >= h) {
            return;
        }
        neighbors.push(grids[y][x]);
    });
    return neighbors;
}

export {
    next
}