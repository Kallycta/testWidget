import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export class ICallbackGetPnCheckNumberQueryDto extends zodCreateQueryDto({
    number: zOApi(zStr, 'phone number', '+46812345678'),
    country: zOApi(zStr, 'country 2 symbol (ISO-2)', 'SE'),
}) {}
