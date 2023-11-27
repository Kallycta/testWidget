import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';

export class ICallbackSetCallCustomFieldBodyDto extends zodCreateDto({
    callId: zICallbackVisitStringId,
    customField: zICallbackCustomParamKey,
    value: zStr.nullable(),
}) {}
