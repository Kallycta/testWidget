import { throwNew } from '@shared/convolo-core/helpers/helpers/throw-new';

export function throwNewErr(error: string): never {
    return throwNew(new Error(error));
}
