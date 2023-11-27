/**
 * usage: to preserve promise void in short functions, where can't use undefined
 * shortFunc = (x: boolean): Promise<void> => x ? doSmthAsyncReturnsVoid() : asyncEmptyFunction()
 */
export async function asyncEmptyFunction(): Promise<void> {}
