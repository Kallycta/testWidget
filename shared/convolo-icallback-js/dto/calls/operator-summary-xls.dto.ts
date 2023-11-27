import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export class OperatorSummaryXlsRequestDto extends zodCreateQueryDto(
    {
        date_from: zYYYYMMDDDateString.optional(),
        date_to: zYYYYMMDDDateString.optional(),
        widget_id: zOApi(zICallbackWidgetId.optional(), 'Filter by Convolo Leads Widget Id'),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
