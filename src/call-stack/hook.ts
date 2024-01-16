export function hook(fn: Function): Function {
    // const oldFn = fn;
    return (...args: any[]) => {
        console.log('function start');
        console.log(fn);
        
        const res = fn.apply(global, args);
        console.log('function end');
        return res;
    };
}

