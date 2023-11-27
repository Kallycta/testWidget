import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';

export class GetUserIdByWidgetKeyQueryDto extends zodCreateQueryDto({
    widgetKey: zICallbackWidgetKey,
}) {}
