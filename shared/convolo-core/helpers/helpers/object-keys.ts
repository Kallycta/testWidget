import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

/**
 * helpers extends Object.keys and Object.entries that preserve brands as keys,
 * however due to typescript specifics, usage brands for object indexes is highly not recommended
 */
export function objectKeys<T extends {}>(
    obj: T,
): keyof T extends never ? [] : NonEmptyArray<keyof T> {
    return Object.keys(obj) as any;
}
