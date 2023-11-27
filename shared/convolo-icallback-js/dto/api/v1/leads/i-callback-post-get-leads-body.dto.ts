import { zYYYYMMDDDateString } from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { z } from 'zod';
import { zArr, zObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { zICallbackCallStatus } from '@shared/convolo-icallback-js/types/i-callback-call-status';

export class ICallbackPostGetLeadsBodyDto extends zodCreateDto({
    filters: zObj({
        search_string: z.string().optional(),
        name: zStr.optional(),
        phone: zStr.optional(),
        email: zStr.optional(),
        websites: zArr(zStr).optional(),
        widgets: zArr(zICallbackWidgetId).optional(),
        lc_params: zArr(zStr).optional(),
        date_from: zYYYYMMDDDateString.optional(),
        date_to: zYYYYMMDDDateString.optional(),
        agent_answer_time_lte: zSeconds.optional(),
        agent_answer_time_gte: zSeconds.optional(),
        talk_time_lte: zSeconds.optional(),
        talk_time_gte: zSeconds.optional(),
        status: zArr(zICallbackCallStatus).optional(),
        agents: zArr(zAgentId).optional(),
        lead_status: zStr.optional(),
        rating: zStr.optional(),
        comment: zStr.optional(),
    }),
    pagination: zObj({
        page: z.number().int().positive().default(1),
        items_per_page: z.number().int().positive().min(5).max(100).default(20),
    }),
}) {}
