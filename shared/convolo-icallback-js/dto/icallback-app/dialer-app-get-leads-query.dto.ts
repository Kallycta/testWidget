import { zEnum, zNum, zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppGetLeadsQueryDto extends zodCreateQueryDto({
    list: zEnum(['todo', 'my', 'all']).default('all'),
    take: zNum.int().positive().max(100).default(20),
    skip: zNum.int().nonnegative().default(0),
}) {}
