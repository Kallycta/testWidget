import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zDialerAppCallItem } from '@shared/convolo-icallback-js/dto/icallback-app/common';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppGetCallInfoResponseDto extends zodCreateDto(
    {
        call: zDialerAppCallItem,
    },
    zIsSuccessResponseDto,
) {}
