import { clone } from "../base/utils";
import { GCell } from "../model/model";

function init(grids: GCell[][]): GCell[][] {
    const matrix: GCell[][] = clone(grids);
    const h = matrix.length;
    const w = matrix[0].length;
    const midH = Math.floor(h / 2);
    const midW = Math.floor(w / 2);
    matrix[midH][midW].visible = true;
    matrix[midH][midW - 1].visible = true;
    matrix[midH][midW + 1].visible = true;
    return matrix;
}

function run() {
    
}

function up() {

}

function down() {

}

function left() {

}

function right() {

}

export {
    init,

}