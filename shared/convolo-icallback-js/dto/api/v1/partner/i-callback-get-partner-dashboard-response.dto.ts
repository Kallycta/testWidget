import { zArrObj, zNum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';

export class ICallbackGetPartnerDashboardResponseDto extends zodCreateDto(
    zArrObj({
        userId: zUserId,
        userName: zStr,
        visits: zNum,
        uniques: zNum,
        calls: zNum,
        answered: zNum,
        missed: zNum,
        noanswer: zNum,
        date_start: zDateISOString,
        date_end: zDateISOString,
    }),
) {}
