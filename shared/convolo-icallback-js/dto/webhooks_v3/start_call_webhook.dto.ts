import { z } from 'zod';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackWebhookLeadDto } from '@shared/convolo-icallback-js/dto/webhooks_v3/types/icallback-webhook-agent.dto';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';

export const zICallbackWebhookStartCallPayload = z.object({
    type: z.literal('start_call'),
    call_id: zICallbackVisitStringId,
    user_id: zUserId,
    widget_key: zICallbackWidgetKey,
    widget_name: z.string(),
    timezone: zTimezoneString,
    is_delayed_call: z.boolean(),
    called_lead_phone: z.string(),
    lead: zICallbackWebhookLeadDto,
});

export type ICallbackWebhookStartCallPayload = z.infer<typeof zICallbackWebhookStartCallPayload>;
