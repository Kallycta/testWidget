import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type Minutes = Brand<number, 'Minutes'>;

export const zMinutes = zOApi(z.custom<Minutes>(zodIntBrand), {
    description: 'Number of minutes',
    type: 'integer',
    example: 45,
});
