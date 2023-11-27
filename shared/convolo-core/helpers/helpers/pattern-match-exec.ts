import { patternMatch } from '@shared/convolo-core/helpers/helpers/pattern-match';

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
