import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class ICallbackGetExpensesQueryDto extends zodCreateQueryDto(
    {
        date_from: zYYYYMMDDDateString.optional(),
        date_to: zYYYYMMDDDateString.optional(),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
