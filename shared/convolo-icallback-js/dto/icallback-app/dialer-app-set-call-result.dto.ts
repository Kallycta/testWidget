import { zArr, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppSetCallResultResponseDto extends zodCreateDto(
    {
        rating: zArr(zStr),
        comment: zStr,
    },
    zIsSuccessResponseDto,
) {}
