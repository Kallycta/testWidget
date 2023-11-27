import { z } from 'zod';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { zArrObj, zObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zICallbackCallId } from '@shared/convolo-icallback-js/brands/ICallbackCallId';
import { zICallbackCallStatus } from '@shared/convolo-icallback-js/types/i-callback-call-status';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export const zCallListItem = z.object({
    id: zICallbackCallId,
    call_id: zICallbackVisitStringId,
    client_number: z.string(),
    time_created: zDateISOString.nullable(),
    record_link: z.string().nullable(),
    status: zICallbackCallStatus,
    time_future: zDateISOString.nullable(),
    time_started: zDateISOString.nullable(),
    time_answered: zDateISOString.nullable(),
    time_lead_answered: zDateISOString.nullable(),
    operator_number: z.string().nullable(),
    operator_name: z.string().nullable(),
    time_ended: zDateISOString.nullable(),
    time_current: zDateISOString.optional(),
    phone_number_country: z.string().optional(),
    result_client: z.string().optional(),
    result_operator: z.string().optional(),
    disconnected_by: z.enum(['lead', 'agent']).optional(),
    missed_by: zArrObj({ name: zStr.optional(), phone: zStr }).optional(),
    total_bill: z.number().optional(),
});

export type CallListItem = z.infer<typeof zCallListItem>;

export class CallListResponseDto extends zodCreateDto(
    {
        calls: z.array(
            zCallListItem.merge(
                zObj({
                    custom_params: zArrObj({ name: zICallbackCustomParamKey, value: z.string() }),
                    hidden_custom_fields: z.array(zICallbackCustomParamKey),
                    username: z.string(),
                    widget_name: z.string(),
                    widget_id: zICallbackWidgetId,
                    url: z.string(),
                    data_source: z.string().optional(),
                    referer: z.string().optional(),
                    source: z.string().optional(),
                    campaign: z.string().optional(),
                    ip: z.string().optional(),
                    ip_country: z.string().optional(),
                }),
            ),
        ),
        data: z.object({
            calls_total: z.number(),
            calls_answered: z.number(),
            calls_no_answer: z.number(),
            calls_missed: z.number(),
            is_more_calls: z.boolean(),
        }),
    },
    zIsSuccessResponseDto,
) {}
