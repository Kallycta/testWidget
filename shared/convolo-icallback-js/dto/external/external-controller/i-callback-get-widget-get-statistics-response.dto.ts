import { zNum, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { z } from 'zod';

export class ICallbackGetWidgetGetStatisticsResponseDto extends zodCreateDto({
    date_start: zDateISOString,
    date_end: zDateISOString,
    visits_total: zNum,
    stats: z.record(zNum),
}) {}
