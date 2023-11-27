import { zScheduleTimeInterval } from '@shared/convolo-core/common/schedule.model';
import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppGetScheduleResponseDto extends zodCreateDto(
    {
        schedule: z.array(zScheduleTimeInterval),
    },
    zIsSuccessResponseDto,
) {}
