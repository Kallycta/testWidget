import { zICallbackWidgetApiKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetApiKey';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class WidgetApiKeyQueryDto extends zodCreateQueryDto({
    widget_key: zICallbackWidgetKey,
    api_key: zICallbackWidgetApiKey,
}) {}
