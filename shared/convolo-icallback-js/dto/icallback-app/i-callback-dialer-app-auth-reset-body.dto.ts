import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackDialerAppAuthResetBodyDto extends zodCreateDto({
    email: z.string().email(),
}) {}
