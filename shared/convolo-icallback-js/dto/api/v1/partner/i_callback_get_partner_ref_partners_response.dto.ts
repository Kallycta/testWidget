import { zArrObj, zBool, zNum, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetPartnerRefPartnersResponseDto extends zodCreateDto(
    {
        partners: zArrObj({
            username: zStr,
            isActive: zBool,
            credits: zNum,
            id: zUserId,
        }),
    },
    zIsSuccessResponseDto,
) {}
