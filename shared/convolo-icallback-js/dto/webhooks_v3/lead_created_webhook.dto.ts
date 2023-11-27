import { z } from 'zod';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackWebhookLeadDto } from '@shared/convolo-icallback-js/dto/webhooks_v3/types/icallback-webhook-agent.dto';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';

export const zICallbackWebhookLeadCreatedPayload = z.object({
    type: z.literal('lead_created'),
    call_id: zICallbackVisitStringId,
    user_id: zUserId,
    widget_key: zICallbackWidgetKey,
    widget_name: z.string(),
    timezone: zTimezoneString,
    time_planned_iso_string: zDateISOString.nullable(),
    is_delayed_call: z.boolean(),
    lead: zICallbackWebhookLeadDto,
});

export type ICallbackWebhookLeadCreatedPayload = z.infer<
    typeof zICallbackWebhookLeadCreatedPayload
>;
