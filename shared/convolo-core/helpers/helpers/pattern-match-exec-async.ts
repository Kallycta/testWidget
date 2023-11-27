import { patternMatch } from '@shared/convolo-core/helpers/helpers/pattern-match';

export async function patternMatchExecAsync<T extends string | number, R extends any>(
    value: T | undefined | null,
    patterns: Array<[T | Array<T>, () => R | Promise<R>]> | Record<T, () => R | Promise<R>>,
): Promise<R | undefined> {
    if (value) return patternMatch(value, patterns)?.();
    return undefined;
}
