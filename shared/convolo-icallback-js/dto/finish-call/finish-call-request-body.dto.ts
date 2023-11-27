import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { z } from 'zod';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { zGlobalCallLog } from '@shared/convolo-icallback-js/types/global-call-log';

export class FinishCallRequestBodyDto extends zodCreateDto({
    callStartTimestamp: zTimestampS,
    managerAnswerTimestamp: zTimestampS.optional(),
    managerName: z.string().optional(),
    managerPhone: z.string().optional(),
    managerEmail: z.string().optional(),
    leadAnswerTimestamp: zTimestampS.optional(),
    call_end: zTimestampS,
    record_link: z.string().optional(),
    visit_id: zICallbackVisitStringId,
    disconnectedBy: z.enum(['lead', 'agent']).optional(),
    disable_notifications: zOApi(zBool, 'disables all notifications: email, sms and webhooks'),
    disable_email: z.boolean().optional(),
    disable_sms: z.boolean().optional(),
    disable_webhooks: z.boolean().optional(),
    status: z.number().int(),
    globalCallLog: zGlobalCallLog,
}) {}
