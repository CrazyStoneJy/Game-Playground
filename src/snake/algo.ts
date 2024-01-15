import { contain } from "../utils/arrays";
import { clone } from "../utils/utils";
import { Point, PointType, SPoint, TPoint, VPoint } from "../model/model";
import { getPoint, isDown, isLeft, isRight, isUp, mask_r } from "./direction";
import { DEFAULT_SNAKE_H, DEFAULT_SNAKE_W, SnakeEnity } from "./model";

function initSnake(grids: TPoint[][]): SnakeEnity {
    const matrix: TPoint[][] = grids;
    const h = matrix.length;
    const w = matrix[0].length;
    const midH = Math.floor(h / 2);
    const midW = Math.floor(w / 2);

    // init body
    const body: SPoint[] = [];
    body.push({
        ...matrix[midH][midW - 1],
        visible: true,
        cur_dir: mask_r,
        type: PointType.SNAKE
    });
    body.push({
        ...matrix[midH][midW],
        visible: true,
        cur_dir: mask_r,
        type: PointType.SNAKE
    });
    // init head
    const head = {
        ...matrix[midH][midW + 1],
        visible: true,
        cur_dir: mask_r,
        type: PointType.SNAKE
    };

    const snake: SnakeEnity = {
        body,
        head,
        isAlive: true,
        dir: mask_r
    };
    // console.log(snake);
    return snake;
}



function run(snake: SnakeEnity, grids: TPoint[][], food: TPoint | null): SnakeEnity {
    const { isAlive } = snake;
    if (!isAlive) {
        return snake;
    }
    return move(snake, grids, food);
}

function move(snake: SnakeEnity, grids: TPoint[][], food: TPoint | null): SnakeEnity {
    let nextSnake = clone(snake);

    let { head } = nextSnake;
    const { cur_dir } = head;

    //move head
    const eaten = moveHead(nextSnake, grids, food);

    // move body 
    moveBody(nextSnake, grids, cur_dir, eaten);

    return {
        ...nextSnake,
        eaten
    };
}

/**
 * 
 * @param snake 
 * @param grids 
 * @returns 蛇头是否碰到了食物
 */
function moveHead(snake: SnakeEnity, grids: TPoint[][], food: TPoint | null): boolean {
    const { head, dir: next_dir } = snake;
    const { x, y } = head;
    const point = getPoint(next_dir);
    if (checkRange({ x: x + point.x, y: y + point.y }, grids)) {
        grids[head.y][head.x].visible = false;
        head.x += point.x;
        head.y += point.y;
        head.cur_dir = next_dir;
        if (head.x === food?.x && head.y === food?.y) {
            return true;
        }
    } else {
        snake.isAlive = false;
    }
    return false;
}

function moveBody(snake: SnakeEnity, grids: TPoint[][], next_dir: number, eaten: boolean): void {
    const { body } = snake;
    let _next_dir: number = next_dir;
    for (let i = body.length - 1; i >= 0; i--) {
        const point: SPoint = body[i];
        const { cur_dir } = point;
        body[i] = {
            ...point,
            cur_dir: _next_dir
        }
        _next_dir = cur_dir;
    }

    // move 
    snake.body = body.map((spoint: SPoint) => {
        const { cur_dir: next_dir, x, y } = spoint;
        const point = getPoint(next_dir);
        grids[spoint.y][spoint.x].visible = false;
        spoint.x += point.x;
        spoint.y += point.y;
        return spoint;
    });

    // 如果食物被吃，在队尾增加一个 
    if (eaten) {
        const cur_tail: SPoint = body[0];
        let offset: Point = { x: 0, y: 0 };
        if (isUp(cur_tail.cur_dir)) {
            offset = { x: 0, y: 1 };
        } else if (isDown(cur_tail.cur_dir)) {
            offset = { x: 0, y: -1 };
        } else if (isLeft(cur_tail.cur_dir)) {
            offset = { x: 1, y: 0 };
        } else if (isRight(cur_tail.cur_dir)) {
            offset = { x: -1, y: 0 };
        }
        const tail: SPoint = {
            x: offset.x + cur_tail.x,
            y: offset.y + cur_tail.y,
            visible: true,
            type: PointType.SNAKE,
            cur_dir: cur_tail.cur_dir
        }
        snake.body.splice(0, 0, tail);
    }

}

function checkRange(point: Point, grids: TPoint[][]): boolean {
    const isInRange = point.x >= 0 && point.x < DEFAULT_SNAKE_W && point.y >= 0 && point.y < DEFAULT_SNAKE_H;
    if (!isInRange) {
        return false;
    }
    const hasBodyCollision = grids[point.y][point.x].visible && (grids[point.y][point.x].type !== PointType.FOOD);
    return !hasBodyCollision;
}

function genFood(grids: TPoint[][], snake: SnakeEnity): SPoint {
    const { body, head } = snake;
    const array = clone(body);
    array.splice(0, 0, head);
    const points: VPoint[] = array.map((point: SPoint) => {
        return {
            x: point.x,
            y: point.y,
            visible: point.visible
        }
    });
    const arr: TPoint[] = grids.flat().filter((cell: TPoint) => {
        return !contain(points, cell);
    });
    const len = arr.length;
    const randIndex = Math.floor(Math.random() * len);
    const cell = arr[randIndex];
    return {
        x: cell.x,
        y: cell.y,
        visible: true,
        type: PointType.FOOD,
        cur_dir: 1
    }
}

export {
    initSnake,
    run,
    genFood
}