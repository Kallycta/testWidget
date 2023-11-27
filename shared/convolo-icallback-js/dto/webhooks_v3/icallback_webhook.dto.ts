import { z } from 'zod';
import { zICallbackWebhookAgentAnsweredPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/agent_answered_webhook.dto';
import { zICallbackWebhookAgentResultRegisteredPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/agent_result_registered_webhook.dto';
import { zICallbackWebhookEndCallPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/end_call_webhook.dto';
import { zICallbackWebhookLeadAnsweredPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/lead_answered_webhook.dto';
import { zICallbackWebhookLeadCreatedPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/lead_created_webhook.dto';
import { zICallbackWebhookLeadResultRegisteredPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/lead_result_registered_webhook.dto';
import { zICallbackWebhookStartCallPayload } from '@shared/convolo-icallback-js/dto/webhooks_v3/start_call_webhook.dto';

export const zICallbackWebhookPayload = z.union([
    zICallbackWebhookAgentAnsweredPayload,
    zICallbackWebhookAgentResultRegisteredPayload,
    zICallbackWebhookEndCallPayload,
    zICallbackWebhookLeadAnsweredPayload,
    zICallbackWebhookLeadCreatedPayload,
    zICallbackWebhookLeadResultRegisteredPayload,
    zICallbackWebhookStartCallPayload,
]);

export type ICallbackWebhookPayload = z.infer<typeof zICallbackWebhookPayload>;
export type ICallbackWebhookPayloadType = ICallbackWebhookPayload['type'];
