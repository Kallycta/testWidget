import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { Awaited, Exact, MakeFieldNonNullable } from '@shared/convolo-core/helpers/type-helpers';
import { Milliseconds } from '@shared/convolo-core/common/time-brands/milliseconds';

/**
 * @deprecated The please use method in separate file
 */
export const asyncWaitSeconds = async (seconds: Seconds) =>
    new Promise((resolve) => setTimeout(resolve, Math.floor(seconds * 1000)));

/**
 * @deprecated The please use method in separate file
 */
export const randomInteger = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max + 1 - min));

/**
 * @deprecated The please use method in separate file
 */
export const asyncWaitMilliseconds = async (milliseconds: Milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, Math.floor(milliseconds)));

/**
 * @deprecated The please use method in separate file
 */
export function throwNew<T extends Error>(error: T): never {
    throw error;
}

/**
 * @deprecated The please use method in separate file
 */
export function throwNewErr(error: string): never {
    return throwNew(new Error(error));
}

/**
 * @deprecated The please use method in separate file
 */
export function patternMatch<T extends string | number | boolean, R>(
    value: T | undefined | null | boolean,
    pattern: Array<[T | Array<T> | boolean, R]> | Record<T extends boolean ? never : T, R>,
): R | undefined {
    if (Array.isArray(pattern)) {
        for (const key of pattern)
            if (Array.isArray(key[0]))
                for (const subKey of key[0]) {
                    if (value === true ? !!subKey : subKey === value) return key[1];
                }
            else if (value === true ? !!key[0] : key[0] === value) return key[1];
    } else {
        return (pattern as any)[value as string | number];
    }
    return undefined;
}

/**
 * @deprecated The please use method in separate file
 */
export function patternMatchExec<T extends string | number | boolean, R extends any>(
    value: T | undefined | null,
    patterns:
        | Array<[T | Array<T> | boolean, () => R]>
        | Record<T extends boolean ? never : T, () => R>,
    defaultValue?: () => R,
): R | undefined {
    if (value) return (patternMatch(value, patterns) ?? defaultValue)?.();
    return undefined;
}

/**
 * @deprecated The please use method in separate file
 */
export async function patternMatchExecAsync<T extends string | number, R extends any>(
    value: T | undefined | null,
    patterns: Array<[T | Array<T>, () => R | Promise<R>]> | Record<T, () => R | Promise<R>>,
): Promise<R | undefined> {
    if (value) return patternMatch(value, patterns)?.();
    return undefined;
}

/**
 * @deprecated The please use method in separate file
 */
export const inArray = <T, R extends T>(needle: T, haystack: Readonly<R[]>): needle is R =>
    haystack.includes(needle as R);

/**
 * @deprecated The please use method in separate file
 */
export const fInArray =
    <T, R extends T>(haystack: Readonly<R[]>): ((needle: T) => boolean) =>
    (needle: T) =>
        haystack.includes(needle as R);

/**
 * @deprecated The please use method in separate file
 */
export const inArrayExact = <T, R>(
    needle: T & Exact<T, R>,
    haystack: Readonly<(R & Exact<T, R>)[]>,
) => haystack.includes(needle as any);

/**
 * @deprecated The please use method in separate file
 */
export const arrayRemoveDuplicates = <T>(arr: T[]): T[] => [...new Set<T>(arr)];

/**
 * @deprecated The please use method in separate file
 */
export const arrayHasDuplicates = <T>(arr: T[]): boolean =>
    arr.length > arrayRemoveDuplicates(arr).length;

/**
 * @deprecated The please use method in separate file
 */
export function pmap<T, U>(
    arr: NonEmptyArray<T>,
    func: (arg: T) => U,
): U extends Promise<any> ? Promise<NonEmptyArray<Awaited<U>>> : NonEmptyArray<U>;

/**
 * @deprecated The please use method in separate file
 */
export function pmap<T, U>(
    arr: Array<T>,
    func: (arg: T) => U,
): U extends Promise<any> ? Promise<Array<Awaited<U>>> : Array<U>;

/**
 * @deprecated The please use method in separate file
 */
export function pmap<T, U>(arr: T[], func: (arg: T) => U): any {
    const mapped = arr.map(func);
    return mapped.some((i) => i instanceof Promise) ? Promise.all(mapped) : mapped;
}

/**
 * @deprecated The please use method in separate file
 */
export async function pfilter<T, U>(arr: T[], func: (arg: T) => Promise<boolean>): Promise<T[]> {
    const filteredArray: T[] = [];
    const arrFilter = await pmap(arr, func);
    arr.forEach((v, k) => {
        if (arrFilter[k]) filteredArray.push(v);
    });

    return filteredArray;
}

/**
 * @deprecated The please use method in separate file
 */
export const exactType = <Actual, Expected>(
    _actual: Actual & Exact<Actual, Expected>,
    _expected: Expected & Exact<Actual, Expected>,
) => {};

/**
 * @deprecated The please use method in separate file
 */
export const typeStrictEqual = <Actual, Expected>(
    a: Actual & Exact<Actual, Expected>,
    b: Expected & Exact<Actual, Expected>,
) => a === b;

/**
 * @deprecated The please use method in separate file
 */
export const expectType = <Type>(_value: Type): void => void 0;

/**
 * @deprecated The please use method in separate file
 */
export const checkType = <Type>(value: Type): Type => value;

/**
 * @deprecated The please use method in separate file
 */
export const expectNever = (value: never): never =>
    throwNew(new TypeError('Unexpected value: ' + value));

/**
 * @deprecated The please use method in separate file
 */
export type NonEmptyArray<T> = [T, ...Array<T>];

/**
 * @deprecated The please use method in separate file
 */
export const isNotEmptyArray = <T = unknown>(
    array: T[] | undefined | null,
): array is NonEmptyArray<T> => Array.isArray(array) && array.length > 0;

/**
 * @deprecated The please use method in separate file
 */
export const isObjectNotEmpty = <K extends number | string | symbol, V>(
    obj: Record<K, V> | null | undefined | unknown,
): obj is Record<K, V> =>
    !!obj && typeof obj === 'object' && Object.keys(obj).length > 0 && obj.constructor === Object;

/**
 * @deprecated The please use method in separate file
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    ...keysToOmit: K[]
): Omit<T, K> =>
    Object.fromEntries(
        Object.entries(obj).filter(([key]) => !inArray(key as any, keysToOmit)),
    ) as any;

/**
 * @deprecated The please use method in separate file
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    ...keysToPick: K[]
): Pick<T, K>;

/**
 * @deprecated The please use method in separate file
 */
export function pick<
    T extends Record<string, any>,
    Z extends string,
    KR extends keyof T,
    R extends Record<Z, KR>,
>(
    obj: T,
    keysToPick: R,
): {
    [P in keyof R]: R[P] extends keyof T ? T[R[P]] : never;
};

/**
 * @deprecated The please use method in separate file
 */
export function pick<
    T extends Record<string, any>,
    Z extends string,
    K extends keyof T,
    KR extends keyof T,
    R extends Record<Z, KR>,
>(
    obj: T,
    ...keysToPick: [...Array<K>, R]
): {
    [P in keyof R]: R[P] extends keyof T ? T[R[P]] : never;
} & Pick<T, K>;

/**
 * @deprecated The please use method in separate file
 */
export function pick(obj: any, ...keysToPick: any) {
    return Object.fromEntries([
        ...(Object.entries(obj).filter(([key]) =>
            inArray(
                key as any,
                keysToPick.filter((k: any) => typeof k === 'string'),
            ),
        ) as any),
        ...(isNotEmptyArray(keysToPick) && isObjectNotEmpty(keysToPick[keysToPick.length - 1])
            ? Object.entries(keysToPick[keysToPick.length - 1] as Record<string, string>).map(
                  ([newKey, oldKey]) => [newKey, obj[oldKey]],
              )
            : []),
    ]);
}

/**
 * @deprecated The please use method in separate file
 */
export function fPick<T extends Record<string, any>, K extends keyof T>(
    ...keysToPick: K[]
): (obj: T) => Pick<T, K>;

/**
 * @deprecated The please use method in separate file
 */
export function fPick<
    T extends Record<string, any>,
    Z extends string,
    K extends keyof T,
    KR extends keyof T,
    R extends Record<Z, KR>,
>(
    keysToPick: R,
): (obj: T) => {
    [P in keyof R]: R[P] extends keyof T ? T[R[P]] : never;
};

/**
 * @deprecated The please use method in separate file
 */
export function fPick<
    T extends Record<string, any>,
    Z extends string,
    K extends keyof T,
    KR extends keyof T,
    R extends Record<Z, KR>,
>(
    ...keysToPick: [...Array<K>, R]
): (obj: T) => {
    [P in keyof R]: R[P] extends keyof T ? T[R[P]] : never;
} & Pick<T, K>;

/**
 * @deprecated The please use method in separate file
 */
export function fPick(...keysToPick: any): any {
    return (obj: Record<string, any>) => pick(obj, ...keysToPick);
}

/**
 * @deprecated The please use method in separate file
 */
export const fOmit =
    <T extends Record<string, any>, K extends keyof T>(
        ...keysToOmit: K[]
    ): ((obj: T) => Omit<T, K>) =>
    (obj) =>
        omit(obj, ...keysToOmit);

/**
 * @deprecated The please use method in separate file
 */
export function fGet<T, K extends keyof T>(key: K): (obj: T) => T[K];
/**
 * @deprecated The please use method in separate file
 */
export function fGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(
    key1: K1,
    key2: K2,
): (obj: T) => T[K1][K2];
/**
 * @deprecated The please use method in separate file
 */
export function fGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3,
): (obj: T) => T[K1][K2][K3];
/**
 * @deprecated The please use method in separate file
 */
export function fGet(key1: any, key2?: any, key3?: any): any {
    return (obj: any) => (key3 ? obj[key1]?.[key2]?.[key3] : key2 ? obj[key1]?.[key2] : obj[key1]);
}

/**
 * @deprecated The please use method in separate file
 */
export function emptyFunction(): void {}

/**
 * @deprecated The please use method in separate file
 */
export async function asyncEmptyFunction(): Promise<void> {}

/**
 * @deprecated The please use method in separate file
 */
export const isNotNullOrUndefined = <TValue>(value: TValue | null | undefined): value is TValue =>
    value !== null && value !== undefined;

/**
 * @deprecated The please use method in separate file
 */
export const getFilterObjectFieldIsNotNullOrUndefined =
    <T, K extends string>(field: K) =>
    (value: T | MakeFieldNonNullable<T, K>): value is MakeFieldNonNullable<T, K> =>
        (value as any)[field] !== null && (value as any)[field as any] !== undefined;

/**
 * @deprecated The please use method in separate file
 */
export function objectKeys<T extends {}>(
    obj: T,
): keyof T extends never ? [] : NonEmptyArray<keyof T> {
    return Object.keys(obj) as any;
}

/**
 * @deprecated The please use method in separate file
 */
export const objectEntries = <K extends string, V>(obj: Record<K, V>): Array<[K, V]> =>
    Object.entries(obj) as any;

/**
 * @deprecated The please use method in separate file
 */
export const ellipsize = (str: string, limit: number) =>
    str.length > limit ? `${str.slice(0, limit)}...` : str;

/**
 * @deprecated The please use method in separate file
 */
export function compareFunc<T>(func: (x: T) => number): (a: T, b: T) => number {
    return (a, b) => func(a) - func(b);
}

/**
 * @deprecated The please use method in separate file
 */
export function compareFuncDesc<T>(func: (x: T) => number): (a: T, b: T) => number {
    return (a, b) => func(b) - func(a);
}

/**
 * @deprecated The please use method in separate file
 */
export function shuffle<T>(a: NonEmptyArray<T>): NonEmptyArray<T>;

/**
 * @deprecated The please use method in separate file
 */
export function shuffle<T>(a: Array<T>): Array<T>;

/**
 * @deprecated The please use method in separate file
 */
export function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
}

/**
 * @deprecated The please use method in separate file
 */
export function randomElementFromArray<T>(a: NonEmptyArray<T>): T;

/**
 * @deprecated The please use method in separate file
 */
export function randomElementFromArray<T>(a: Array<T>): T | undefined;

/**
 * @deprecated The please use method in separate file
 */
export function randomElementFromArray<T>(a: Array<T>): T | undefined {
    return isNotEmptyArray(a) ? a[randomInteger(0, a.length - 1)] : undefined;
}

/**
 * @deprecated The please use method in separate file
 */
export function iif(
    condition: boolean,
    ifTrue: (...args: any[]) => any,
    ifFalse: (...args: any[]) => any = emptyFunction,
) {
    return (condition ? ifTrue : ifFalse)();
}
