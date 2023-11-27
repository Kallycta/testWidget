export const fInArray =
    <T, R extends T>(haystack: Readonly<R[]>): ((needle: T) => boolean) =>
    (needle: T) =>
        haystack.includes(needle as R);
