import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class WidgetGetCollectDataQueryDto extends zodCreateQueryDto({
    visit_id: zICallbackVisitStringId,
    params: zStr,
}) {}
