import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class AuthLoginResponseDto extends zodCreateDto(
    {
        token: z.string().optional(),
        refresh_token: z.string().optional(),
    },
    zIsSuccessResponseDto,
) {}
