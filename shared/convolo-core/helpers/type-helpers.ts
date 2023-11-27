/**
 * @deprecated The please use method in separate file
 */
export type Exact<A, B> = (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B ? 1 : 0
    ? A extends B
        ? B extends A
            ? unknown
            : never
        : never
    : never;

/**
 * @deprecated The please use method in separate file
 */
export type TypeEqual<Target, Value> = (<T>() => T extends Target ? 1 : 2) extends <
    T,
>() => T extends Value ? 1 : 2
    ? true
    : false;

/**
 * @deprecated The please use method in separate file
 */
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/**
 * @deprecated The please use method in separate file
 */
export type MakeFieldNonNullable<T, K extends string> = Omit<T, K> & {
    [P in K]: K extends keyof T ? NonNullable<T[K]> : never;
};

/**
 * @deprecated The please use method in separate file
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @deprecated The please use method in separate file
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
