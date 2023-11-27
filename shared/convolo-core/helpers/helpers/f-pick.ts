import { pick } from '@shared/convolo-core/helpers/helpers/pick';

/**
 * curried pick, convenient for map operations
 * eg someArr.map(fPick('field1', 'field2')) instead of someArr.map(obj => pick(obj, 'field1', 'field2'))
 * sometimes it's needed to rename some
 * then transfer it as an Record<newName, oldName> in the last argument (which is optional)
 * eg someArr.map(fPick('f1', 'f2', {nf3: 'f3'})) instead of someArr.map(obj => pick(obj, 'f1', 'f2', {nf3, 'f3'}))
 */
export function fPick<T extends Record<string, any>, K extends keyof T>(
    ...keysToPick: K[]
): (obj: T) => Pick<T, K>;

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

export function fPick(...keysToPick: any): any {
    return (obj: Record<string, any>) => pick(obj, ...keysToPick);
}
