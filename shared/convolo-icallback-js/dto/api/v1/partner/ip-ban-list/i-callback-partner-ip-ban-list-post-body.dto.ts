import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zValidRegExpString } from '@shared/convolo-core/common/valid-reg-exp-string';

export class ICallbackPartnerIpBanListPostBodyDto extends zodCreateDto({
    reason: z.string(),
    ip_pattern: zValidRegExpString,
}) {}
