import { SPoint } from "../model/model";

export type SnakeEnity = {
    body: SPoint[], // 蛇身
    head: SPoint, // 蛇头
    last_dir: number; // 上一次方向
    cur_dir: number; // 当前方向
    isAlive: boolean; // 是否存活
};
