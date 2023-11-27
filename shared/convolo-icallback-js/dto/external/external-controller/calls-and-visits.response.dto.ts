import { zArrObj, zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class CallsAndVisitsResponseDto extends zodCreateDto(
    {
        isTooBigInterval: zBool.optional(),
        data: zArrObj({
            date: z.string(),
            calls: z.number(),
            visits: z.number(),
            demo: zBool.optional(),
        }),
    },
    zIsSuccessResponseDto,
) {}
