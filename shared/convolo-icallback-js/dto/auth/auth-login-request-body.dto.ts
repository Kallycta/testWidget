import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class AuthLoginRequestBodyDto extends zodCreateDto({
    email: z.string().email(),
    password: z.string(),
}) {}
