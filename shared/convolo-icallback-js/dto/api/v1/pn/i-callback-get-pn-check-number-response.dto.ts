import { zBool, zNum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetPnCheckNumberResponseDto extends zodCreateDto(
    {
        isValidNumber: zBool,
        isValidNumberForRegion: zBool,
        originalFormat: zStr,
        nationalFormat: zStr,
        internationalFormat: zStr,
        E164: zStr,
        countryISO2: zStr.optional(),
        numberType: zNum,
    },
    zIsSuccessResponseDto,
) {}
