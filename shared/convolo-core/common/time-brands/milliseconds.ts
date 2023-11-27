import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type Milliseconds = Brand<number, 'Milliseconds'>;

export const zMilliseconds = zOApi(z.custom<Milliseconds>(zodIntBrand), {
    description: 'Number of Milliseconds',
    type: 'integer',
    example: 45,
});
