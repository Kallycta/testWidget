import { zArr, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';

export class ICallbackPostCallgroupBodyDto extends zodCreateDto({
    name: zStr,
    agentIds: zArr(zAgentId),
}) {}
