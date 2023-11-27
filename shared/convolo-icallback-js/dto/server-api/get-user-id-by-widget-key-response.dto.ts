import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class GetUserIdByWidgetKeyResponseDto extends zodCreateDto(
    {
        found: zBool,
        userId: zUserId.optional(),
    },
    zIsSuccessResponseDto,
) {}
