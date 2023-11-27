export const isObjectNotEmpty = <K extends number | string | symbol, V>(
    obj: Record<K, V> | null | undefined | unknown,
): obj is Record<K, V> =>
    !!obj && typeof obj === 'object' && Object.keys(obj).length > 0 && obj.constructor === Object;
