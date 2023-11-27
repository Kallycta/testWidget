import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackWidgetApiKey = Brand<string, 'ICallbackWidgetApiKey'>;
export const zICallbackWidgetApiKey = zOApi(z.custom<ICallbackWidgetApiKey>(zodStringBrand), {
    description: 'Widget API security key',
    type: 'string',
    example: '50a2015cc3597a79384434e01f1db726',
});
