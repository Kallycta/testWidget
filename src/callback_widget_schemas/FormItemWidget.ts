import { z } from 'zod';

export const zFormItemWidget = z.object({
    step: z.number(),
    title: z.string(),
    okText: z.string(),
    name: z.string(),
    value: z.string(),
    type: z.string(),
    isSend: z.boolean(),
    isCurrent: z.boolean(),
});

export type FormItemWidget = z.infer<typeof zFormItemWidget>;
