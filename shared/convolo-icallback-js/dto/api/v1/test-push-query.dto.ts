import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class TestPushQueryDto extends zodCreateQueryDto({
    email: zStr,
    name: zStr.optional(),
    phone: zStr.optional(),
}) {}
