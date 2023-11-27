/**
 * Pattern matching expression checks value against variants, 2 types of patterns is possible:
 * tuples: patternMatch(value, [variant1, result1], [[variant2a, variant2a], result2])
 * with tuples possible to group several variants for one result, but less effective search and a bit bulky
 * also it's possible to search against boolean expressions: patternMatch(true, [<expr1>, result1], [<expr2>, result2])
 * object: patternMatch(value, {variant1: result1, variant2: result2})
 * with object it looks a bit better, greedy against enums and string unions
 * the main disadvantage against original switch - it doesn't resolve discriminated unions
 * WARNING: unlike original switch all values will be calculated, be careful if data may be not correct,
 * or it has effects or heavy computations. Use lazy version and patternMatchExec in this case.
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
