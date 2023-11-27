import { Exact } from '@shared/convolo-core/helpers/type-helpers/exact';

export const inArrayExact = <T, R>(
    needle: T & Exact<T, R>,
    haystack: Readonly<(R & Exact<T, R>)[]>,
) => haystack.includes(needle as any);
