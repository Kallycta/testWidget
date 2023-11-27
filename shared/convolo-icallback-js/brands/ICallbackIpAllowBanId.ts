import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type ICallbackIpAllowBanId = Brand<string, 'ICallbackBanIpId'>;
export const zICallbackAllowBanId = zOApi(z.custom<ICallbackIpAllowBanId>(zodStringBrand), {
    description: 'Convolo Leads Allow or Ban Ip entity id',
    type: 'string',
    example: '01FJMF4H421TYD6VAEW63BZM06',
});
