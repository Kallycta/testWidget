import { zUserId } from '@shared/convolo-core/brands/user-id';
import { z } from 'zod';
import { zScheduleType } from '@shared/convolo-core/common/schedule.model';
import { zBool } from '@shared/convolo-core/helpers/zod-helpers';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';

export const zICallbackAgentSettings = z.object({
    working_hours: zScheduleType.optional(),
    timezone: zTimezoneString.optional(),
    onboard_sms: z
        .union([
            z.object({ status: z.literal('dismissed') }),
            z.object({ status: z.literal('sent'), to: z.string() }),
        ])
        .optional(),
    onboard_email: z
        .union([
            z.object({ status: z.literal('dismissed') }),
            z.object({ status: z.literal('sent'), to: z.string() }),
        ])
        .optional(),
    delegateUser: zUserId.optional(),
    delegateShowOnlyCallsInProgress: z.boolean().optional(),
    delegateAccessToMissedCallsOfUnassignedLeads: z.boolean().optional(),
    delegateAccessToCalls: z
        .enum(['no_access', 'own_calls', 'own_widgets', 'all_calls'])
        .optional(),
    isBusy: zBool.optional(),
});

export type ICallbackAgentSettings = z.infer<typeof zICallbackAgentSettings>;
