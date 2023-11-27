import { zBool, zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import {
    YYYYMMDDDateString,
    zYYYYMMDDDateString,
} from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zUserId } from '@shared/convolo-core/brands/user-id';

export class ICallbackGetExtBillingCallAmountQueryDto extends zodCreateQueryDto(
    {
        date_from: zYYYYMMDDDateString,
        date_to: zYYYYMMDDDateString,
        user_id: zUserId,
        need_details: zBool.optional(),
    },
    {
        date_from: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
        date_to: (x) => (x ? (x as YYYYMMDDDateString) : undefined),
    },
) {}
