import { zArr, zBool, zEnum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackDialerAppAuthRefreshTokenResponseDto extends zodCreateDto(
    {
        access_token: zStr,
    },
    zIsSuccessResponseDto,
) {}
