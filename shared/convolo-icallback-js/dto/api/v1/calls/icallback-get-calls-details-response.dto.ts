import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackCallId } from '@shared/convolo-icallback-js/brands/ICallbackCallId';
import { z } from 'zod';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCallStatus } from '@shared/convolo-icallback-js/types/i-callback-call-status';
import { zICallbackCallAdditionalJson } from '@shared/convolo-icallback-js/types/i-callback-call-additional-json';

export class IcallbackGetCallsDetailsResponseDto extends zodCreateDto({
    id: zICallbackCallId,
    visit_str: zStr,
    visit_stat: zStr,
    url: zStr,
    widget_id: zICallbackWidgetId,
    widget_name: z.string(),
    call_id: zICallbackVisitStringId,
    client_number: z.string().nullable(),
    time_created: zDateISOString.nullable(),
    record_link: z.string().nullable(),
    status: zICallbackCallStatus,
    time_started: zDateISOString.nullable(),
    time_answered: zDateISOString.nullable(),
    time_future: zDateISOString.nullable(),
    time_lead_answered: zDateISOString.nullable(),
    operator_number: z.string().nullable(),
    operator_name: z.string().nullable(),
    time_ended: zDateISOString.nullable(),
    time_current: zDateISOString.optional(),
    result_operator: z.string().optional(),
    result_client: z.string().optional(),
    total_bill: z.number().optional(),
    billed_calls: zICallbackCallAdditionalJson.shape.billed_calls,
    call_log: zICallbackCallAdditionalJson.shape.call_log,
    email_log: zICallbackCallAdditionalJson.shape.email_log,
}) {}
