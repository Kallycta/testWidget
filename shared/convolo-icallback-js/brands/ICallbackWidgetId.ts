import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';

export type ICallbackWidgetId = Brand<number, 'ICallbackWidgetId'>;
export type ICallbackWidgetStringId = Brand<string, 'ICallbackWidgetStringId'>;

export const zICallbackWidgetId = zOApi(z.custom<ICallbackWidgetId>(zodIntBrand), {
    description: 'Convolo Leads Widget id',
    type: 'integer',
    example: 12345,
});
