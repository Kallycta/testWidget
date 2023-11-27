import { zEnum, zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class ICallbackGetSetCallCommentQueryDto extends zodCreateQueryDto({
    callId: zICallbackVisitStringId,
    comment: zStr,
    type: zEnum(['Client', 'Operator']),
}) {}
