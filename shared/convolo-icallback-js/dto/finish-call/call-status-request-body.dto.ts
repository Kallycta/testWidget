import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';

export class CallStatusRequestBodyDto extends zodCreateDto({
    callStartTimestamp: zTimestampS,
    managerAnswerTimestamp: zTimestampS.optional(),
    leadAnswerTimestamp: zTimestampS.optional(),
    currentTimestamp: zTimestampS.optional(),
    visit_id: zICallbackVisitStringId,
}) {}
