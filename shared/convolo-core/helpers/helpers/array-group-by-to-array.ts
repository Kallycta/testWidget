/**
 * makes grouping of array to another array (cb returns index)
 * arrayGroupByToArray([1,2,3,4,5], el => el % 2 === 0 ? 1 : 0)
 * => [ [1,3,5], [2,4] ]
 */

export function arrayGroupByToArray<T>(
    arr: T[],
    cb: (el: T, idx: number, arr: T[]) => number,
): Array<T[]> {
    const ret: Array<T[]> = [];
    arr.forEach((el, idx) => (ret[cb(el, idx, arr)] ??= [] as T[]).push(el));
    if (ret.length <= 100) for (let i = 0; i < ret.length; i++) ret[i] = ret[i] ?? [];

    return ret;
}
