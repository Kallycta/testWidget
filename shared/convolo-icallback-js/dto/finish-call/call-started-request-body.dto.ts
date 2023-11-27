import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class CallStartedRequestBodyDto extends zodCreateDto({
    callStartTimestamp: zTimestampS,
    visit_id: zICallbackVisitStringId,
    disable_notifications: zBool,
}) {}
