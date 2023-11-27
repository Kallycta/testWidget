import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { z } from 'zod';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { zGlobalCallLog } from '@shared/convolo-icallback-js/types/global-call-log';

export class LeadAnsweredRequestBodyDto extends zodCreateDto({
    callStartTimestamp: zTimestampS,
    leadAnswerTimestamp: zTimestampS,
    leadPhone: z.string(),
    visit_id: zICallbackVisitStringId,
    disable_notifications: zOApi(zBool, 'disables all notifications: email, sms and webhooks'),
    globalCallLog: zGlobalCallLog,
}) {}
