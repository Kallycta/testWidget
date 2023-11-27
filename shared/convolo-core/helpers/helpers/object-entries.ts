export const objectEntries = <K extends string, V>(obj: Record<K, V>): Array<[K, V]> =>
    Object.entries(obj) as any;
