/**
 * curried field access, convenient for map operations, up to 3 levels, navigation is safe runtime
 * TODO: safe navigation typing if first key is nullable
 * TODO: ex: type ZZ = {foo?: {bar: number}} []; const eee : ZZ = null as any; const fff = eee.map(fGet('foo', 'bar';)) // error!
 * eg someArr.map(fGet('field1')) instead of someArr.map(obj => obj.field1)
 * eg someArr.map(fGet('field1','sbfield2','sbsbfield3)) instead of someArr.map(obj => obj.field1.sbfield2.sbsbfield3)
 */
export function fGet<T, K extends keyof T>(key: K): (obj: T) => T[K];
export function fGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(
    key1: K1,
    key2: K2,
): (obj: T) => T[K1][K2];
export function fGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3,
): (obj: T) => T[K1][K2][K3];

export function fGet(key1: any, key2?: any, key3?: any): any {
    return (obj: any) => (key3 ? obj[key1]?.[key2]?.[key3] : key2 ? obj[key1]?.[key2] : obj[key1]);
}
