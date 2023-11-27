import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { z } from 'zod';

export class ICallbackPartnerIpAllowListCheckGetResponseDto extends zodCreateDto(
    {
        ip_in_list: z.boolean(),
    },
    zIsSuccessResponseDto,
) {}
