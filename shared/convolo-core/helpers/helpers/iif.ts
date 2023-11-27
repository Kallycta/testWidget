import { emptyFunction } from '@shared/convolo-core/helpers/helpers/empty-function';

/** lazy, expression based if, doesn't support type of true/false expression */
export function iif(
    condition: boolean,
    ifTrue: (...args: any[]) => any,
    ifFalse: (...args: any[]) => any = emptyFunction,
) {
    return (condition ? ifTrue : ifFalse)();
}
