import { zArrObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class PartnerUsersResponseDto extends zodCreateDto(
    {
        data: zArrObj({
            id: zUserId,
            username: zStr,
        }),
    },
    zIsSuccessResponseDto,
) {}
