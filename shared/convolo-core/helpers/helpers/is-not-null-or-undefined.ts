/**
 * usage: mainly for filtering (arr.filter(a => !!a) or so doesn't infer types correctly)
 * const arrWithNulls = ['a', 1, null, undefined]; // (string | number | null | undefined)[]
 * const arrWithoutNulls = arrWithNulls.filter(isNotNullOrUndefined); // (string | number)[]
 */
export const isNotNullOrUndefined = <TValue>(value: TValue | null | undefined): value is TValue =>
    value !== null && value !== undefined;
