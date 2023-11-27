import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';

export class ICallbackPatchSetUserPasswordBodyDto extends zodCreateDto({
    userId: zUserId,
    password: zStr,
}) {}
