import { MakeFieldNonNullable } from '@shared/convolo-core/helpers/type-helpers/make-field-non-nullable';

/**
 * usage: mainly for filtering (arr.filter(a => !!a.phone) or so doesn't infer types correctly)
 * const arrWithNulls = [ { id:1, phone: null }, {id: 2}, { id: 3, phone: '123' }];
 * const phoneNull = arrWithNulls[0].phone; // string | null | undefined
 * const arrWithoutNulls = arrWithNulls.filter(isFieldIsNotNullOrUndefined('phone')); // (string | number)[]
 * const phoneNotNull = arrWithoutNulls[0].phone; // string
 */
export const isFieldNotNullOrUndefined =
    <T, K extends string>(field: K) =>
    (value: T | MakeFieldNonNullable<T, K>): value is MakeFieldNonNullable<T, K> =>
        (value as any)[field] !== null && (value as any)[field as any] !== undefined;
