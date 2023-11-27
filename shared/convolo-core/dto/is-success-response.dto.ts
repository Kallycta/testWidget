import { z } from 'zod';
import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';

export const zIsSuccessResponseDto = z.object({
    success: z.boolean(),
    debug: z.any().optional(),
});

export class IsSuccessResponseDto extends zodCreateDto(zIsSuccessResponseDto) {}
