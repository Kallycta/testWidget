import { omit } from '@shared/convolo-core/helpers/helpers/omit';

/**
 * curried omit, convenient for map operations
 * eg someArr.map(fOmit('field1', 'field2')) instead of someArr.map(obj => omit(obj, 'field1', 'field2'))
 */
export const fOmit =
    <T extends Record<string, any>, K extends keyof T>(
        ...keysToOmit: K[]
    ): ((obj: T) => Omit<T, K>) =>
    (obj) =>
        omit(obj, ...keysToOmit);
