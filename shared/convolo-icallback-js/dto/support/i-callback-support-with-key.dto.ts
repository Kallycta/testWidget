import { zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackUserAdditionalParams } from '@shared/convolo-icallback-js/types/i-callback-user-additional-params';
import { zUserId } from '@shared/convolo-core/brands/user-id';

export class ICallbackSupportWithKeyDto extends zodCreateDto({
    key: zStr,
}) {}
