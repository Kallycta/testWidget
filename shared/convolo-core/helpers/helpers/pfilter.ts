// async filter
import { pmap } from '@shared/convolo-core/helpers/helpers/pmap';

export async function pfilter<T, U>(arr: T[], func: (arg: T) => Promise<boolean>): Promise<T[]> {
    const filteredArray: T[] = [];
    const arrFilter = await pmap(arr, func);
    arr.forEach((v, k) => {
        if (arrFilter[k]) filteredArray.push(v);
    });

    return filteredArray;
}
