import { zYYYYMMDDDateString } from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { z } from 'zod';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class ICallbackGetLeadsQueryDto extends zodCreateQueryDto({
    date_from: zYYYYMMDDDateString.optional(),
    date_to: zYYYYMMDDDateString.optional(),
    page: z.number().int().positive().default(1),
    items_per_page: z.number().int().positive().min(5).max(100).default(20),
    widget_id: zICallbackWidgetId.optional(),
    search_string: z.string().optional(),
}) {}
