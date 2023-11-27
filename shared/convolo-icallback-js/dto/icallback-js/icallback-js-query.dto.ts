import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackJsQueryDto extends zodCreateQueryDto({
    key: zICallbackWidgetKey,
    uri: z.string(),
    only_settings: z.boolean().optional(),
    debugmnb: z.string().optional(),
}) {}
