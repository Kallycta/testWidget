import { zNum, zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class ICallbackGetSetCallTechCommentQueryDto extends zodCreateQueryDto({
    comment: zStr,
    rating: zNum.int().min(0).max(5),
}) {}
