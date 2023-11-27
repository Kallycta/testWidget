import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

export function arrayShuffle<T>(a: NonEmptyArray<T>): NonEmptyArray<T>;
export function arrayShuffle<T>(a: Array<T>): Array<T>;

export function arrayShuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
}
