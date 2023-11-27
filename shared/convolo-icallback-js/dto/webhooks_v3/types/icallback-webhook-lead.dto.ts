import { z } from 'zod';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';

export const zICallbackWebhookAgentDto = z.object({
    id: zAgentId.nullable(),
    phone: z.string(),
    name: z.string(),
    email: z.string().nullable(),
});
