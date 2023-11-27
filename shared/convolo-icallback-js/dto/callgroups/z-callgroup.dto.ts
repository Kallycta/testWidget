import { zArrObj, zBool, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackCallgroupId } from '@shared/convolo-icallback-js/brands/ICallbackCallgroupId';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { z } from 'zod';

export const zCallgroupDto = zObj({
    id: zICallbackCallgroupId,
    name: zStr,
    agents: zArrObj({
        id: zAgentId,
        name: zStr,
        phone: zStr,
        email: zStr.nullable(),
        isActive: zBool,
    }),
});

export type CallgroupDto = z.infer<typeof zCallgroupDto>;
