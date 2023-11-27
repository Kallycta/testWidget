/**
 * // TODO: deprecate when it comes to the standard, if typings is ok
 * makes grouping of array
 * arrayGroupBy([1,2,3,4,5], el => el % 2 === 0 ? 'even' : 'odd')
 * => {'odd' => [1,3,5], 'even' => [2,4]}
 */

export function arrayGroupBy<T, R extends string | number | symbol>(
    arr: T[],
    cb: (el: T, idx: number, arr: T[]) => R,
): Partial<Record<R, T[]>> {
    const ret: Partial<Record<R, T[]>> = {};
    arr.forEach((el, idx) => (ret[cb(el, idx, arr)] ??= [] as T[]).push(el));
    return ret;
}
