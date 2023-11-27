import { arrayRemoveDuplicates } from '@shared/convolo-core/helpers/helpers/array-remove-duplicates';

export const arrayHasDuplicates = <T>(arr: T[]): boolean =>
    arr.length > arrayRemoveDuplicates(arr).length;
