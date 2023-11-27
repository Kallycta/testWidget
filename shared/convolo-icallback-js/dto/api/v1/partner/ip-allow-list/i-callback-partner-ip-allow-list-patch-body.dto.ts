import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zValidRegExpString } from '@shared/convolo-core/common/valid-reg-exp-string';

export class ICallbackPartnerIpAllowListPatchBodyDto extends zodCreateDto({
    ip_pattern_new: zValidRegExpString,
    reason_new: z.string(),
}) {}
