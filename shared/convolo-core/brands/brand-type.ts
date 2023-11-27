export type Brand<K extends number | string, T> = K & { readonly __brand: T };
