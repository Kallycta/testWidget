import { zEnum, zNum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';

export class ICallbackGetPnCheckIpResponseDto extends zodCreateDto(
    {
        ip: zStr,
        range: z.tuple([zNum, zNum]).optional(),
        country: zStr.optional(),
        region: zStr.optional(),
        eu: zEnum(['1', '0']).optional(),
        timezone: zTimezoneString.optional(),
        city: zStr.optional(),
        ll: z.tuple([zNum, zNum]).optional(),
        metro: zNum.optional(),
        area: zNum.optional(),
    },
    zIsSuccessResponseDto,
) {}
