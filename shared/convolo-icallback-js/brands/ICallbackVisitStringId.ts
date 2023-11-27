import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackVisitStringId = Brand<string, 'ICallbackVisitStringId'>;
export const zICallbackVisitStringId = zOApi(z.custom<ICallbackVisitStringId>(zodStringBrand), {
    description: 'Convolo Leads Call/Visit universal id',
    type: 'string',
    example: '35298eac05ef54b365e601f85d46afc1',
});
