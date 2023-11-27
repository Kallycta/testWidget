import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackCallgroupId = Brand<number, 'ICallbackCallgroupId'>;

export const zICallbackCallgroupId = zOApi(z.custom<ICallbackCallgroupId>(zodIntBrand), {
    description: 'Convolo Leads Callgroup entity id',
    type: 'integer',
    example: 12345,
});

export type ICallbackCallgroupStringId = Brand<string, 'ICallbackCallgroupStringId'>;
