export const arrayRemoveDuplicates = <T>(arr: T[]): T[] => [...new Set<T>(arr)];
