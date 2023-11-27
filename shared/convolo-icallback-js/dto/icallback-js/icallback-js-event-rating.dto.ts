import { zArr, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class IcallbackJsEventRatingDto extends zodCreateDto({
    callBackTags: zArr(zStr).optional(),
    rating: zStr.optional(),
    callBackMessage: zStr.optional(),
    agentName: zStr.optional(),
    callerId: zStr.optional(),
}) {}
