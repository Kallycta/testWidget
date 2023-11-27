import { zArr, zBool, zEnum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackDialerAppAuthLoginResponseDto extends zodCreateDto(
    {
        access_token: zStr,
        refresh_token: zStr,
        call_types: zArr(zEnum(['call', 'callback', 'callthrough'])),
        busy: zBool,
    },
    zIsSuccessResponseDto,
) {}
