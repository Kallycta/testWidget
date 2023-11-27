import { zArr, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { zICallbackIpAllowBanRule } from '@shared/convolo-icallback-js/types/i-callback-ip-allow-ban-rule';

export class ICallbackPartnerIpBanListGetResponseDto extends zodCreateDto(
    {
        ip_ban_rules: zArr(zICallbackIpAllowBanRule),
    },
    zIsSuccessResponseDto,
) {}
