export type MakeFieldNonNullable<T, K extends string> = Omit<T, K> & {
    [P in K]: K extends keyof T ? NonNullable<T[K]> : never;
};
