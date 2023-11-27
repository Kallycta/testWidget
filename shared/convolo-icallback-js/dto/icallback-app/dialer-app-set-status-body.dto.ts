import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppSetStatusBodyDto extends zodCreateDto({
    busy: zBool,
}) {}
