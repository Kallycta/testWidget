import { zScheduleTimeInterval } from '@shared/convolo-core/common/schedule.model';
import { zArr, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppSetScheduleBodyDto extends zodCreateDto(zArr(zScheduleTimeInterval)) {}
