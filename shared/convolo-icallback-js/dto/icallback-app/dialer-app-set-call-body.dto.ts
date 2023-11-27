import { zArr, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppSetCallResultBodyDto extends zodCreateDto({
    rating: zArr(zStr),
    comment: zStr,
}) {}
