import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export class ICallbackGetPnCheckIpQueryDto extends zodCreateQueryDto({
    ip: zOApi(zStr, 'ip address', '8.8.8.8'),
}) {}
