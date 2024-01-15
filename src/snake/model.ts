import { SPoint } from "../model/model";

export type SnakeEnity = {
    body: SPoint[], // 蛇身
    head: SPoint, // 蛇头
    isAlive: boolean; // 是否存活
    dir: number,
    eaten?: boolean;
};


export const DEFAULT_SNAKE_H = 20;
export const DEFAULT_SNAKE_W = 20;