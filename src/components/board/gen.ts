import { PointType } from "../../model/model";

export function genBoard(h: number, w: number) {
    return Array.from(
        { length: h },
        (_: number, y: number) => {
            return Array.from(
                { length: w },
                (_: number, x: number) => {
                    return {
                        x,
                        y,
                        visible: false,
                        type: PointType.DEFAULT
                    };
                }
            );
        }
    );
}