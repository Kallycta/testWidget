/**
 * checks if needle in haystack, if you need to narrow enum or union, add 'as const' to array of variants
 * type of var1 == 'foo' | 'bar' | 'baz' | 'qux'
 * if (inArray(var1, ['foo', 'bar'] as const)) { typeof var1 == 'foo' | 'bar' }
 * it doesn't resolve discriminated unions, alas
 */
export const inArray = <T, R extends T>(needle: T, haystack: Readonly<R[]>): needle is R =>
    haystack.includes(needle as R);
