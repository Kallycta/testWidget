import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class WidgetGetSetSmsStatusQueryDto extends zodCreateQueryDto({
    callId: zICallbackVisitStringId,
    uuid: zStr,
    status: zStr,
}) {}
