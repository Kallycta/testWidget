/**
 * Clones an object with prototype,
 * moved to a separate file to avoid circular inclusion
 */

export const cloneClassObject = <T>(obj: T): T =>
    Object.assign(Object.create(Object.getPrototypeOf(obj)), obj) as T;
