import { zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackAllowBanId } from '@shared/convolo-icallback-js/brands/ICallbackIpAllowBanId';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { z } from 'zod';
import { zValidRegExpString } from '@shared/convolo-core/common/valid-reg-exp-string';

export const zICallbackIpAllowBanRule = zObj({
    id: zICallbackAllowBanId,
    ip_type: z.enum(['allow', 'ban']),
    time_created: zDateISOString,
    reason: zStr,
    ip_pattern: zValidRegExpString,
});
export type ICallbackIpAllowBanRule = z.infer<typeof zICallbackIpAllowBanRule>;
