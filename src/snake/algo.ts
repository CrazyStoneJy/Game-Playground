import { contain } from "../base/arrays";
import { clone } from "../base/utils";
import { Point, PointType, SPoint, TPoint, VPoint } from "../model/model";
import { getPoint, mask_r } from "./direction";
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
        ...matrix[midH][midW - 3],
        visible: true,
        cur_dir: mask_r,
        type: PointType.SNAKE
    });
    body.push({
        ...matrix[midH][midW - 2],
        visible: true,
        cur_dir: mask_r,
        type: PointType.SNAKE
    });
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
        dir: 1
    };
    // console.log(snake);
    return snake;
}



function run(snake: SnakeEnity, grids: VPoint[][], food: TPoint | null): SnakeEnity {
    const { isAlive } = snake;
    if (!isAlive) {
        return snake;
    }
    return move(snake, grids, food);
}

function move(snake: SnakeEnity, grids: VPoint[][], food: TPoint | null): SnakeEnity {
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
function moveHead(snake: SnakeEnity, grids: VPoint[][], food: TPoint | null): boolean {
    const { head, dir: next_dir } = snake;
    const { x, y } = head;
    const point = getPoint(next_dir);
    if (checkRange({x: x + point.x, y: y + point.y})) {
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

function moveBody(snake: SnakeEnity, grids: VPoint[][], next_dir: number, eaten: boolean): void {
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
        // console.log(point);
        if (checkRange({x: x + point.x, y: y + point.y})) {
            grids[spoint.y][spoint.x].visible = false;
            spoint.x += point.x;
            spoint.y += point.y;
        } else {
            snake.isAlive = false;
        }
        return spoint;
    });

    // 如果食物被吃，在队尾增加一个 
    if (eaten) {
        const cur_tail: SPoint = body[0];
        const point = getPoint(cur_tail.cur_dir);
        const tail: SPoint = {
            x: point.x + cur_tail.x,
            y: point.y + cur_tail.y,
            visible: true,
            type: PointType.SNAKE,
            cur_dir: cur_tail.cur_dir
        }
        snake.body.splice(0, 0, tail);
    }

}

function checkRange(point: Point): boolean {
    return point.x >= 0 && point.x < DEFAULT_SNAKE_W && point.y >= 0 && point.y < DEFAULT_SNAKE_H;
}

function genFood(grids: TPoint[][], snake: SnakeEnity): SPoint {
    const { body, head } = snake;
    body.splice(0, 0, head);
    const snake_entity: SPoint[] = body;
    const points: VPoint[] = snake_entity.map((point: SPoint) => {
        return {
            x: point.x,
            y: point.y,
            visible: point.visible
        }
    });
    const arr:TPoint[] = grids.flat().filter((cell: TPoint) => {
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