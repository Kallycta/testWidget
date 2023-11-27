import { z } from 'zod';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zICallbackWebhookAgentDto } from '@shared/convolo-icallback-js/dto/webhooks_v3/types/icallback-webhook-lead.dto';
import { zICallbackWebhookLeadDto } from '@shared/convolo-icallback-js/dto/webhooks_v3/types/icallback-webhook-agent.dto';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';

export const zICallbackWebhookLeadAnsweredPayload = z.object({
    type: z.literal('lead_answered'),
    call_id: zICallbackVisitStringId,
    user_id: zUserId,
    widget_key: zICallbackWidgetKey,
    widget_name: z.string(),
    timezone: zTimezoneString,
    time_started_iso_string: zDateISOString,
    time_agent_answered_iso_string: zDateISOString.nullable(),
    time_lead_answered_iso_string: zDateISOString.nullable(),
    is_delayed_call: z.boolean(),
    answer_duration_sec: zSeconds,
    lead_answer_duration_sec: zSeconds,
    called_lead_phone: z.string(),
    agent: zICallbackWebhookAgentDto,
    lead: zICallbackWebhookLeadDto,
});

export type ICallbackWebhookLeadAnsweredPayload = z.infer<
    typeof zICallbackWebhookLeadAnsweredPayload
>;
