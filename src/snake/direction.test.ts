import { change, getDirection, isDown, isRight, isUp, mask_d, mask_u } from "./direction";


describe('snake algo', () => {
    test('direction', () => {
        expect(isRight()).toBe(true);
        change(mask_d);
        // console.log(getDirection());
        expect(isDown()).toBe(true);
        expect(isUp()).toBe(false);
        change(mask_u);
        expect(isDown()).toBe(false);
        expect(isUp()).toBe(true);
    })
});