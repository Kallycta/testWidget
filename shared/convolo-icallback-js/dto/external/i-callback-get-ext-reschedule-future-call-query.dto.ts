import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zMinutes } from '@shared/convolo-core/common/time-brands/minutes';

export class ICallbackGetExtRescheduleFutureCallQueryDto extends zodCreateQueryDto({
    delay_minutes: zMinutes,
}) {}
