import { z } from 'zod';
import { zArrObj, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetExpensesResponseDto extends zodCreateDto(
    {
        success: z.boolean(),
        expenses: zArrObj({
            userId: zUserId,
            username: z.string(),
            leadsExpense: z.number(),
            leadsUaeExpense: z.number(),
            leadsCallCount: z.number(),
            leadsSmsCount: z.number(),
            dialerExpense: z.number(),
            dialerUaeExpense: z.number(),
            dialerCallCount: z.number(),
            totalExpense: z.number(),
            totalUaeExpense: z.number(),
        }),
        startDateIso: zDateISOString,
        endDateIso: zDateISOString,
    },
    zIsSuccessResponseDto,
) {}
