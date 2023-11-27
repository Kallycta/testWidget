import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zUserId } from '@shared/convolo-core/brands/user-id';

export class ICallbackPatchSetUserNoteBodyDto extends zodCreateDto({
    userId: zUserId,
    note: zStr,
}) {}
