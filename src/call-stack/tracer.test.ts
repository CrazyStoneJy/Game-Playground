import { hook } from "./hook";

describe('tracer', () => {
    test('trace', () => {
        function foo(n: number): number {
            if (n === 0) {
                return 1;
            }
            if (n === 1) {
                return 1;
            }
            return foo(n - 1) + foo(n - 2);
        }
        const res = hook(foo)(5);
        console.log(res);
        
    });
});