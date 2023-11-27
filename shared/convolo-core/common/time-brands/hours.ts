import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type Hours = Brand<number, 'Hours'>;

export const zHours = zOApi(z.custom<Hours>(zodIntBrand), {
    description: 'Number of hours',
    type: 'integer',
    example: 12,
});
