import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';

export class ICallbackPostPartnerBlockUserBodyDto extends zodCreateDto({
    userId: zUserId,
}) {}
