import { throwNew } from '@shared/convolo-core/helpers/helpers/throw-new';

export const expectNever = (value: never): never =>
    throwNew(new TypeError('Unexpected value: ' + value));
