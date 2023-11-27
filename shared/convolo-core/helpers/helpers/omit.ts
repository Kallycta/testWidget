import { inArray } from '@shared/convolo-core/helpers/helpers/in-array';

export const omit = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    ...keysToOmit: K[]
): Omit<T, K> =>
    Object.fromEntries(
        Object.entries(obj).filter(([key]) => !inArray(key as any, keysToOmit)),
    ) as any;
