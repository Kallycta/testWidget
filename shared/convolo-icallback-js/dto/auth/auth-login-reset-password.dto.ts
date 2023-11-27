import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class AuthLoginResetPasswordDto extends zodCreateDto({
    token: z.string(),
    password: z.string(),
    confirm_password: z.string(),
}) {}
