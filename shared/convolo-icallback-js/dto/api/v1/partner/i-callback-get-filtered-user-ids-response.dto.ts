import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetFilteredUserIdsResponseDto extends zodCreateDto(
    {
        userIds: z.array(zUserId),
    },
    zIsSuccessResponseDto,
) {}
