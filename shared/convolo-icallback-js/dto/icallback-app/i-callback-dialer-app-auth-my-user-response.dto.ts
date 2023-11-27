import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackDialerAppAuthMyUserResponseDto extends zodCreateDto(
    {
        user: zUserId,
    },
    zIsSuccessResponseDto,
) {}
