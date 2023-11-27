import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackLeadId = Brand<string, 'ICallbackLeadId'>;
export const zICallbackLeadId = zOApi(z.custom<ICallbackLeadId>(zodStringBrand), {
    description: 'Convolo Leads Lead entity id',
    type: 'string',
    example: '01FJMF4H421TYD6VAEW63BZM06',
});
