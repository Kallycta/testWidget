import { zEnum, zNum, zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppGetCallsQueryDto extends zodCreateQueryDto({
    list: zEnum(['all', 'my', 'done']).default('all'),
    take: zNum.int().positive().max(100).default(20),
    skip: zNum.int().nonnegative().default(0),
}) {}
