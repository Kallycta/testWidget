import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';

export type TimezoneString = Brand<string, 'TimezoneString'>;

export const zTimezoneString = zOApi(z.custom<TimezoneString>(zodStringBrand), {
    description: 'Timezone string according to IANA',
    type: 'string',
    example: 'Europe/Stockholm',
});
