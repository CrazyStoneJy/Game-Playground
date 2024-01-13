// { up, down, left, right }
// u d l r
// 1 1 1 1
let direction: number = 1;
const mask_u = parseInt('1000', 2);
const mask_d = parseInt('0100', 2);
const mask_l = parseInt('0010', 2);
const mask_r = parseInt('0001', 2);

function getDirection(): number {
    return direction;
}

function isUp() {
    return (getDirection() ^ mask_u) === 0;
}

function isDown() {
    return (getDirection() ^ mask_d) === 0;
}

function isLeft() {
    return (getDirection() ^ mask_l) === 0;
}

function isRight() {
    return (getDirection() ^ mask_r) === 0;
}

function change(mask: number): void {
    direction = (direction & mask) | mask;
}

export {
    getDirection,
    isDown,
    isLeft,
    isRight,
    isUp,
    mask_u,
    mask_d,
    mask_l,
    mask_r,
    change
}