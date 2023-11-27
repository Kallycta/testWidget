import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class WidgetGetRegisterEventQueryDto extends zodCreateQueryDto({
    visit_id: zICallbackVisitStringId,
    event: zStr,
    params: zStr.optional(),
}) {}
