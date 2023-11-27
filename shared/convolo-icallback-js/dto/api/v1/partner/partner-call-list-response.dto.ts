import { z } from 'zod';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { zArrObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export const zPartnerCallListItem = z.object({
    id: z.number(),
    call_id: z.string(),
    username: z.string(),
    widget_name: z.string(),
    widget_id: zICallbackWidgetId,
    url: z.string(),
    client_number: z.string(),
    time_created: zDateISOString.nullable(),
    record_link: z.string().nullable(),
    status: z.string(),
    time_future: zDateISOString.nullable(),
    time_started: zDateISOString.nullable(),
    time_answered: zDateISOString.nullable(),
    time_lead_answered: zDateISOString.nullable(),
    operator_number: z.string().nullable(),
    operator_name: z.string().nullable(),
    time_ended: zDateISOString.nullable(),
    time_current: zTimestampS.optional(),
    // TODO: clarify or remove
    details: z.any(),
    events: z.any(),
    ip: z.string().optional(),
    country: z.string().optional(),
    result_client: z.string().optional(),
    result_operator: z.string().optional(),
    // TODO: events.CALL_ORDERED_API?.data?.source;
    data_source: z.string().optional(),
    referer: z.string().optional(),
    source: z.string().optional(),
    campaign: z.string().optional(),
    technical_comment: z.string().optional(),
    technical_rating: z.number().optional(),
    disconnected_by: z.enum(['lead', 'agent']).optional(),
    total_bill: z.number().optional(),
    missed_by: zArrObj({ name: zStr.optional(), phone: zStr }).optional(),
    custom_params: zArrObj({ name: zICallbackCustomParamKey, value: z.string() }),

    hidden_custom_fields: z.array(zICallbackCustomParamKey),
});

export type PartnerCallListItem = z.infer<typeof zPartnerCallListItem>;

export class PartnerCallListResponseDto extends zodCreateDto(
    {
        calls: z.array(zPartnerCallListItem),
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
