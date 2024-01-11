export type Level = {
    h: number;
    v: number;
    mineCount: number;
}

const EASY: Level = {
    h: 8,
    v: 8,
    mineCount: 8
}

const MID: Level = {
    h: 9,
    v: 9,
    mineCount: 15
}

const DIF: Level = {
    h: 12,
    v: 12,
    mineCount: 30
}

export {
    EASY,
    MID,
    DIF
};
