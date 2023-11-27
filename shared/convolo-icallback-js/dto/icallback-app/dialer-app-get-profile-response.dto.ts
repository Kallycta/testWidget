import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zDialerAppProfile } from '@shared/convolo-icallback-js/dto/icallback-app/common';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppGetProfileResponseDto extends zodCreateDto(
    {
        profile: zDialerAppProfile,
    },
    zIsSuccessResponseDto,
) {}
