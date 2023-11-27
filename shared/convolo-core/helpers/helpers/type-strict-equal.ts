import { Exact } from '@shared/convolo-core/helpers/type-helpers/exact';

/**
 * works with Branded types unlike normal comparison ===
 * warning: doesn't make equal assertion
 */
export const typeStrictEqual = <Actual, Expected>(
    a: Actual & Exact<Actual, Expected>,
    b: Expected & Exact<Actual, Expected>,
) => a === b;
