import { z } from 'zod';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { zGlobalCallLog } from '@shared/convolo-icallback-js/types/global-call-log';
import { zArr, zArrObj, zEnum, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zNotificationEmailType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import {
    zLcCallAgentShort,
    zLcCallOrder,
    zLcCallProviderShort,
} from '@shared/convolo-icallback-js/dto/voximplantTypes';

export const zICallbackCallAdditionalJson = z.object({
    disconnectedBy: z.enum(['lead', 'agent']).optional(),
    url: z.string().optional(),
    body: z.any().optional(),
    res: z.any().optional(),
    resultScript: z
        .object({
            url: z.string().optional(),
            body: z.any().optional(),
            res: z.any().optional(),
        })
        .optional(),
    callRoutingScript: z
        .object({
            url: z.string().optional(),
            body: z.any().optional(),
            err: z.any().optional(),
            res: z.any().optional(),
            elapsed: z.any().optional(),
        })
        .optional(),

    commentRawClient: z.string().optional(),
    commentClient: z.string().optional(),
    commentRawOperator: z.string().optional(),
    commentOperator: z.string().optional(),

    commentRawLead: z.string().optional(),
    commentLead: z.string().optional(),
    commentRawAgent: z.string().optional(),
    commentAgent: z.string().optional(),

    appRating: zObj({
        tag: zStr,
        type: zEnum(['positive', 'negative', 'neutral']),
    }).optional(),

    technicalComment: z.string().optional(),
    technicalRating: z.number().optional(),
    manager_email: z.string().optional(),
    custom_params: z.any().optional(),

    call_log: zGlobalCallLog.optional(),

    firstManagerPhone: z.string().optional(),
    firstManagerPhones: zArr(zStr).optional(),

    billed_calls: z
        .array(
            z.object({
                phoneNumber: z.string(),
                billedSeconds: zSeconds,
                tariffName: z.string().optional(),
                tariff: z.string().optional(),
                cost: z.number().optional(),
                rate: z.number().optional(),
            }),
        )
        .optional(),
    total_bill: z.number().optional(),

    // todo: check this and remove
    total_seconds: z.number().optional(),
    less_than_min_duration: z.boolean().optional(),

    currentTimestamp: zTimestampS.optional(),

    email_log: zArrObj({
        to: zStr,
        title: zStr,
        type: zNotificationEmailType,
        body: zStr,
        time: zDateISOString,
    }).optional(),

    result_call_groups: z.array(z.array(zLcCallAgentShort).nonempty()).optional(),
    providers: zArr(zLcCallProviderShort).optional(),
    call_order: zLcCallOrder.optional(),
});

export type ICallbackCallAdditionalJson = z.infer<typeof zICallbackCallAdditionalJson>;
