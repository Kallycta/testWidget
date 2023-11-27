import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackDialerAppAuthLoginBodyDto extends zodCreateDto({
    email: z.string().email(),
    password: z.string(),
    push_token: z.string().nullable().default(null),
    iosPushkitToken: z.string().nullable().default(null),
}) {}
