import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type Days = Brand<number, 'Days'>;

export const zDays = zOApi(z.custom<Days>(zodIntBrand), {
    description: 'Number of days',
    type: 'integer',
    example: 12,
});
