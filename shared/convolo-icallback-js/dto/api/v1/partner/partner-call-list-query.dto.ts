import { zUserId } from '@shared/convolo-core/brands/user-id';
import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zBool, zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';

export class PartnerCallListQueryDto extends zodCreateQueryDto(
    {
        date_from: zYYYYMMDDDateString.optional(),
        date_to: zYYYYMMDDDateString.optional(),
        user_id: zUserId.optional(),
        show_blocked: zBool.optional(),
        select_by_start_time: zOApi(
            zBool.optional(),
            'use start time (instead of created time) in from and to criteria',
        ),
        max_calls: zOApi(z.number().int().min(-1).optional(), 'max calls, -1 for unlimited'),
        partner_id: zUserId.optional(),
        search_string: z.string().optional(),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
