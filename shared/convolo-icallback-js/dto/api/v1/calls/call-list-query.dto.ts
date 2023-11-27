import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { z } from 'zod';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class CallListQueryDto extends zodCreateQueryDto(
    {
        date_from: zYYYYMMDDDateString.optional(),
        date_to: zYYYYMMDDDateString.optional(),
        widget_id: zICallbackWidgetId.optional(),
        max_calls: z.number().int().positive().optional(),
        search_string: z.string().optional(),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
