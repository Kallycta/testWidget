import { inArray } from '@shared/convolo-core/helpers/helpers/in-array';
import { isNotEmptyArray } from '@shared/convolo-core/helpers/helpers/is-not-empty-array';
import { isObjectNotEmpty } from '@shared/convolo-core/helpers/helpers/is-object-not-empty';

/**
 * Takes some fields, sometimes it's needed to rename some
 * then transfer it as a Record<newName, oldName> in the last argument (which is optional)
 * e.g. const obj = { aaa: 1, bbb: 2, ccc: 3, ddd: 4, eee: 5 };
 * pick(obj, 'aaa', 'bbb') -> {aaa: 1, bbb: 2};
 * pick(obj, 'aaa', 'bbb', {xxx: 'ccc', yyy: 'ccc', zzz: 'ddd'}) -> {aaa: 1, bbb: 2, xxx: 3, yyy: 3, ddd: 4};
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    ...keysToPick: K[]
): Pick<T, K>;

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
