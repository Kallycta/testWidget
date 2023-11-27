import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackDialerAppAuthRefreshTokenBodyDto extends zodCreateDto({
    email: z.string().email(),
    refresh_token: z.string(),
}) {}
