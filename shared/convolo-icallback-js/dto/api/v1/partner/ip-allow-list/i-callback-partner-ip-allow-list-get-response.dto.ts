import { zArr, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { zICallbackIpAllowBanRule } from '@shared/convolo-icallback-js/types/i-callback-ip-allow-ban-rule';

export class ICallbackPartnerIpAllowListGetResponseDto extends zodCreateDto(
    {
        ip_allow_rules: zArr(zICallbackIpAllowBanRule),
    },
    zIsSuccessResponseDto,
) {}
