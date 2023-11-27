import { isNotEmptyArray } from '@shared/convolo-core/helpers/helpers/is-not-empty-array';
import { randomInteger } from '@shared/convolo-core/helpers/helpers/random-integer';
import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

export function arrayRandomElement<T>(a: NonEmptyArray<T>): T;
export function arrayRandomElement<T>(a: Array<T>): T | undefined;

export function arrayRandomElement<T>(a: Array<T>): T | undefined {
    return isNotEmptyArray(a) ? a[randomInteger(0, a.length - 1)] : undefined;
}
