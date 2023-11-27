import { zUserId } from '@shared/convolo-core/brands/user-id';
import { z } from 'zod';
import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class CallsAndVisitsQueryDto extends zodCreateQueryDto(
    {
        user_id: zUserId.optional(),
        date_from: zYYYYMMDDDateString,
        date_to: zYYYYMMDDDateString,
        date_interval: z.enum(['hour', 'day', 'week', 'month', 'year']),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
