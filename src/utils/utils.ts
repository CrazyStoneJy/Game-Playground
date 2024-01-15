export type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function clone<T extends JSONValue>(t: T): T {
    return JSON.parse(JSON.stringify(t));
}

export {
    clone
}