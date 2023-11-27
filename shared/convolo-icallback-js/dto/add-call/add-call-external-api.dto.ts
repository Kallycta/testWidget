import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackWidgetApiKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetApiKey';
import {
    zObj,
    zodCreateDto,
    zodCreateQueryDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';

export const zAddCallApiExternalRequestDto = zObj({
    widget_key: zICallbackWidgetKey,
    api_key: zICallbackWidgetApiKey,
    client_number: zStr,
    agent_number: zStr.optional(),
    country: zStr.optional(),
    call_answer_timestamp: zTimestampS.optional(),
    call_start_timestamp: zTimestampS.optional(),
    timestamp: zTimestampS.optional(),
    status: z.enum(['ANSWER', 'NOANSWER']),
    call_record_link: zStr.optional(),
    agent_id: zAgentId.optional(),
});

export type AddCallApiExternalRequestDto = z.infer<typeof zAddCallApiExternalRequestDto>;

export class AddCallApiExternalRequestQueryDto extends zodCreateQueryDto(
    zAddCallApiExternalRequestDto,
) {}

export class AddCallApiExternalRequestBodyDto extends zodCreateDto(zAddCallApiExternalRequestDto) {}
