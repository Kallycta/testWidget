import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';

export class ICallbackSupportClearVisitSessionsForIpQueryDto extends zodCreateQueryDto({
    ip: zOApi(z.string().optional(), 'ip of visit, by default - current ip'),
}) {}
