export function throwNew<T extends Error>(error: T): never {
    throw error;
}
