export type Level = {
    h: number;
    v: number;
    mineCount: number;
}

const EASY: Level = {
    h: 6,
    v: 6,
    mineCount: 8
}

const MID: Level = {
    h: 9,
    v: 9,
    mineCount: 20
}

const DIF: Level = {
    h: 12,
    v: 12,
    mineCount: 40
}

export {
    EASY,
    MID,
    DIF
};
