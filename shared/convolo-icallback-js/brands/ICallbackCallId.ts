import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';

export type ICallbackCallId = Brand<number, 'ICallbackCallId'>;

export const zICallbackCallId = zOApi(z.custom<ICallbackCallId>(zodIntBrand), {
    description: 'Convolo Leads Call Numeric Id',
    type: 'integer',
    example: 12345,
});
