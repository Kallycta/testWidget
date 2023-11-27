import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type Seconds = Brand<number, 'Seconds'>;

export const zSeconds = zOApi(z.custom<Seconds>(zodIntBrand), {
    description: 'Number of seconds',
    type: 'integer',
    example: 45,
});
