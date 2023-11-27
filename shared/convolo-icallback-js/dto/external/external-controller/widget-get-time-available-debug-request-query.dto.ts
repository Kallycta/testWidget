import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';

export class WidgetGetTimeAvailableDebugRequestQueryDto extends zodCreateQueryDto({
    timestamp: zDateISOString.optional(),
}) {}
