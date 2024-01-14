// { up, down, left, right }
// u d l r
// 1 1 1 1
// let direction: number = 1;
const mask_u = parseInt('1000', 2);
const mask_d = parseInt('0100', 2);
const mask_l = parseInt('0010', 2);
const mask_r = parseInt('0001', 2);

// next diection colud be.
const turn_dirs = [
    [mask_l, mask_r, mask_u], // last dir is up
    [mask_l, mask_r, mask_d], // last dir is down
    [mask_d, mask_r, mask_u], // last dir is left
    [mask_l, mask_d, mask_u] // last dir is right
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
    return (dir & mask) | mask;
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
    turn_dirs
}