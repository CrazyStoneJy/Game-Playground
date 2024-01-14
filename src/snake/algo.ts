import { clone } from "../base/utils";
import { SPoint } from "../model/model";
import { change, initDir, isDown, isLeft, isRight, isUp, mask_d, mask_l, mask_r, mask_u } from "./direction";
import { SnakeEnity } from "./model";

function initSnake(grids: SPoint[][]): SnakeEnity {
    const matrix: SPoint[][] = clone(grids);
    const h = matrix.length;
    const w = matrix[0].length;
    const midH = Math.floor(h / 2);
    const midW = Math.floor(w / 2);
    matrix[midH][midW].visible = true;
    matrix[midH][midW - 1].visible = true;
    matrix[midH][midW + 1].visible = true;

    // init body
    const body: SPoint[] = [];
    body.push(matrix[midH][midW - 1]);
    body.push( matrix[midH][midW]);
    body.push( matrix[midH][midW + 1]);

    // init head
    const head = matrix[midH][midW + 1];

    const snake: SnakeEnity = {
        last_dir: initDir(),
        cur_dir: initDir(),
        body,
        head,
        isAlive: true
    };
    // console.log(snake);
    return snake;
}


function run(snake: SnakeEnity): SnakeEnity {
    const { last_dir: dir, cur_dir, body, head, isAlive } = snake;
    if (!isAlive) {
        return snake;
    }

    if (isUp(dir)) {

    } else if (isDown(dir)) {
        
    } else if (isLeft(dir)) {

    } else if (isRight(dir)) {
        // if (dir === cur_dir) {
        //     return {
        //         last_dir,
        //         cur_dir,
        //         head
        //     };
        // }
    }
    return snake;
}

function move(snake: SnakeEnity, ) {

}

function check() {

}

// function turn(snake: SnakeEnity, turn_dir: number) {
//     const { head, last_dir } = snake;
//     if (last_dir)
// }

function up() {

}

function down() {

}

function left() {

}

function right() {

}

export {
    initSnake
}