import { default_grids } from ".";
import { PointType, SPoint } from "../model/model";
import { genFood, initSnake, run } from "./algo";
import { SnakeEnity } from "./model";
import { change, mask_l, mask_u } from "./direction";

describe('algo', () => {

    let snake: SnakeEnity;
    let food: SPoint;

    test('init', () => {
        snake = initSnake(default_grids);
        food = {
            x: 11,
            y: 6,
            visible: true,
            type: PointType.SNAKE,
            cur_dir: mask_l
        };
        console.log(snake);
        console.log(food);
    });

    test('turn direction', () => {
        // turn upward
        snake.dir = change(snake.dir, mask_u);
        console.log(snake);
        let i = 0;
        let nextSnake: SnakeEnity = snake;
        while (i <= 3) {
            nextSnake = run(nextSnake, default_grids, food);
            console.log(nextSnake);
            i++;
        }
       
        
    });

});