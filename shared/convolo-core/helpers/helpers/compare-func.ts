/**
 * func is used to sort arrays by some rule for shorter notation
 * e.g. obj = {id: number}, objArr.sort(compareFunc(o => o.id))
 */
export function compareFunc<T>(func: (x: T) => number): (a: T, b: T) => number {
    return (a, b) => func(a) - func(b);
}

export function compareFuncDesc<T>(func: (x: T) => number): (a: T, b: T) => number {
    return (a, b) => func(b) - func(a);
}
