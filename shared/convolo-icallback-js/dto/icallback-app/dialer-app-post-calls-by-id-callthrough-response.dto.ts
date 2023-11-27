import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppPostCallsByIdCallthroughResponseDto extends zodCreateDto(
    {
        callthroughPhone: zStr,
        numberExt: zStr,
    },
    zIsSuccessResponseDto,
) {}
