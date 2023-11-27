import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

// TODO: this may be not needed because it works not very well indexing object
export type ICallbackCustomParamKey = Brand<string, 'ICallbackCustomParamKey'>;
export const zICallbackCustomParamKey = zOApi(z.custom<ICallbackCustomParamKey>(zodStringBrand), {
    description: 'Convolo Leads Custom Field name',
    type: 'string',
    example: 'lc_param_company_name',
});
