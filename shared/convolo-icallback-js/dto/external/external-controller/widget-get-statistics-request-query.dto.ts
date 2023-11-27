import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zYYYYMMDDDateString } from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';

export class WidgetGetStatisticsRequestQueryDto extends zodCreateQueryDto({
    date: zYYYYMMDDDateString,
}) {}
