// { up, down, left, right }
// u d l r
// 1 1 1 1

import { Point, dirs_four } from "../model/model";

// let direction: number = 1;
const mask_u = parseInt('1000', 2);
const mask_d = parseInt('0100', 2);
const mask_l = parseInt('0010', 2);
const mask_r = parseInt('0001', 2);

// next diection colud be.
const turn_dirs = [
    [mask_l, mask_r], // last dir is up
    [mask_d, mask_u], // last dir is left
];

function initDir(): number {
    return 1;
}

function isUp(dir: number) {
    return (dir ^ mask_u) === 0;
}

function isDown(dir: number) {
    return (dir ^ mask_d) === 0;
}

function isLeft(dir: number) {
    return (dir ^ mask_l) === 0;
}

function isRight(dir: number) {
    return (dir ^ mask_r) === 0;
}

function change(dir:number, mask: number): number {
    if ((isUp(dir) || isDown(dir)) && turn_dirs[0].indexOf(mask) >= 0) {
        return (dir & mask) | mask;
    }
    if ((isLeft(dir) || isRight(dir)) && turn_dirs[1].indexOf(mask) >= 0) {
        return (dir & mask) | mask;
    }
    return dir;
}

function getPoint(dir: number): Point {
    if (isUp(dir)) {
        return dirs_four[0];
    }
    if (isDown(dir)) {
        return dirs_four[1];
    }
    if (isLeft(dir)) {
        return dirs_four[2];
    }
    if (isRight(dir)) {
        return dirs_four[3];
    }
    return dirs_four[3];
}

export {
    isDown,
    isLeft,
    isRight,
    isUp,
    mask_u,
    mask_d,
    mask_l,
    mask_r,
    change,
    initDir,
    turn_dirs,
    getPoint
}