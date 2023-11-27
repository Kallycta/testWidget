// map helper that supports async functions and non empty arrays
import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

export function pmap<T, U>(
    arr: NonEmptyArray<T>,
    func: (arg: T) => U,
): U extends Promise<any> ? Promise<NonEmptyArray<Awaited<U>>> : NonEmptyArray<U>;

export function pmap<T, U>(
    arr: Array<T>,
    func: (arg: T) => U,
): U extends Promise<any> ? Promise<Array<Awaited<U>>> : Array<U>;

export function pmap<T, U>(arr: T[], func: (arg: T) => U): any {
    const mapped = arr.map(func);
    return mapped.some((i) => i instanceof Promise) ? Promise.all(mapped) : mapped;
}
