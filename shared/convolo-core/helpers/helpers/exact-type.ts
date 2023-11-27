import { Exact } from '@shared/convolo-core/helpers/type-helpers/exact';

/**
 * checks the types are the same, usage: exactType<Type1, Type2>(null as any, null as any);
 */
export const exactType = <Actual, Expected>(
    _actual: Actual & Exact<Actual, Expected>,
    _expected: Expected & Exact<Actual, Expected>,
) => {};
