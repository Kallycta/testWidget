import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

export const isNotEmptyArray = <T = unknown>(
    array: T[] | undefined | null,
): array is NonEmptyArray<T> => Array.isArray(array) && array.length > 0;
