import { z } from 'zod';
import { zArrObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zValidRegExpString } from '@shared/convolo-core/common/valid-reg-exp-string';

export const zICallbackProviderRule = z.object({
    name: zStr,
    pattern: zValidRegExpString,
    providers: zArrObj({
        provider: zStr,
        callerId: zStr,
    }),
});

export type ICallbackProviderRule = z.infer<typeof zICallbackProviderRule>;
