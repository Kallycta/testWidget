import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackSupportSendEmailBodyDto extends zodCreateDto({
    to: z.string().email(),
    subject: z.string(),
    html: z.string(),
    visitId: z.string().optional(),
    key: z.string(),
}) {}
