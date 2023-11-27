import {
    zArrObj,
    zBool,
    zodCreateDto,
    zodCreateQueryDto,
} from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetPartnerUsersQueryDto extends zodCreateQueryDto({
    show_blocked: zBool,
    need_stats: zBool,
    partner_id: zUserId.optional(),
}) {}

export class ICallbackGetPartnerUsersResponseDto extends zodCreateDto(
    {
        users: zArrObj({
            id: zUserId,
            email: z.string(),
            credits: z.number(),
            isActive: z.boolean(),
            isDelegate: z.boolean(),
            defaultCountry: z.string(),
            visits: z.number().optional(),
            calls: z.number().optional(),
            note: z.string(),
        }),
    },
    zIsSuccessResponseDto,
) {}
