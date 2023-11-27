import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackWidgetKey = Brand<string, 'ICallbackWidgetKey'>;

export const zICallbackWidgetKey = zOApi(z.custom<ICallbackWidgetKey>(zodStringBrand), {
    description: 'Convolo Leads Widget Key',
    type: 'string',
    example: '38a7f82ff7f9934294af18b05ae2df38',
});
