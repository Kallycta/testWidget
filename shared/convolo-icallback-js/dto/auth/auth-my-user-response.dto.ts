import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { z } from 'zod';
import { zICallbackUserAdditionalParams } from '@shared/convolo-icallback-js/types/i-callback-user-additional-params';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class AuthMyUserResponseDto extends zodCreateDto(
    {
        userId: zUserId,
        credits: z.number().optional(),
        manager: z.string().optional(),
        manager_rights: zICallbackUserAdditionalParams.shape.mainUserAccess,
        username: z.string().optional(),
        message: z.string().optional(),
        is_partner: zBool.optional(),
        partner_expenses_access: zBool.optional(),
        partner_superuser_access: zBool.optional(),
        is_delegate: zBool.optional(),
        partnerCabinetTitle: z.string().optional(),
        additional: zICallbackUserAdditionalParams,
    },
    zIsSuccessResponseDto,
) {}
