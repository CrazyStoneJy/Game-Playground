import { clone } from "../base/utils";
import { Point, SPoint, VPoint } from "../model/model";
import { change, getPoint, initDir, isDown, isLeft, isRight, isUp, mask_d, mask_l, mask_r, mask_u } from "./direction";
import { DEFAULT_SNAKE_H, DEFAULT_SNAKE_W, SnakeEnity } from "./model";

function initSnake(grids: VPoint[][]): SnakeEnity {
    const matrix: VPoint[][] = grids;
    const h = matrix.length;
    const w = matrix[0].length;
    const midH = Math.floor(h / 2);
    const midW = Math.floor(w / 2);

    // init body
    const body: SPoint[] = [];
    body.push({
        ...matrix[midH][midW - 1],
        visible: true,
        cur_dir: 1,
        next_dir: 1
    });
    body.push({
        ...matrix[midH][midW],
        visible: true,
        cur_dir: 1,
        next_dir: 1
    });
    // init head
    const head = {
        ...matrix[midH][midW + 1],
        visible: true,
        cur_dir: 1,
        next_dir: 1
    };

    const snake: SnakeEnity = {
        body,
        head,
        isAlive: true
    };
    // console.log(snake);
    return snake;
}


function run(snake: SnakeEnity, grids: VPoint[][]): SnakeEnity {
    const { isAlive } = snake;
    if (!isAlive) {
        return snake;
    }
    return move(snake, grids);
}

function move(snake: SnakeEnity, grids: VPoint[][]): SnakeEnity {
    let nextSnake = clone(snake);
    let { head } = nextSnake;
    const { cur_dir } = head;
    console.log('snake: ', nextSnake);
    
    //move head
    nextSnake = moveHead(nextSnake, grids);
    // move body
    nextSnake = moveBody(nextSnake, grids, cur_dir);
    console.log('next snake: ', nextSnake);
    
    return nextSnake;
}

function moveHead(nextSnake: SnakeEnity, grids: VPoint[][]): SnakeEnity {
    const snake = clone(nextSnake);
    const { head } = snake;
    const { next_dir, x, y } = head;
    const point = getPoint(next_dir);
    if (checkRange({x: x + point.x, y: y + point.y})) {
        grids[head.y][head.x].visible = false;
        head.x += point.x;
        head.y += point.y;
    } else {
        snake.isAlive = false;
        return snake;
    }
  
    return snake;
}

function moveBody(nextSnake: SnakeEnity, grids: VPoint[][], next_dir: number): SnakeEnity {
    const snake = clone(nextSnake);
    const { body } = snake;
    // change body all dir;
    let _next_dir: number = next_dir;
    body.map((point: SPoint) => {
        const { cur_dir } = point;
        const p = {
            ...point,
            next_dir: _next_dir
        }
        _next_dir = cur_dir;
        return p;
    });

    // move 
    body.forEach((spoint: SPoint) => {
        const { next_dir, x, y } = spoint;
        const point = getPoint(next_dir);
        if (checkRange({x: x + point.x, y: y + point.y})) {
            grids[spoint.y][spoint.x].visible = false;
            spoint.x += point.x;
            spoint.y += point.y;
        }
    });

    return snake;
}

function checkRange(point: Point): boolean {
    return point.x >= 0 && point.x < DEFAULT_SNAKE_W && point.y >= 0 && point.y <= DEFAULT_SNAKE_H;
}

export {
    initSnake,
    run
}