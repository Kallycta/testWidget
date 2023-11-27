import {
    ICallbackWidgetKey,
    zICallbackWidgetKey,
} from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zEnum, zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class ICallbackGetTestCallthroughQueryDto extends zodCreateQueryDto({
    name: z.string(),
    phone: z.string(),
    country: zEnum(['se', 'ru', 'ae']).default('se'),
    widget_key: zICallbackWidgetKey
        .optional()
        .default('6927f73343ba990f0c9d24a383502231' as ICallbackWidgetKey),
    lead_id: z.string().optional(),
}) {}
