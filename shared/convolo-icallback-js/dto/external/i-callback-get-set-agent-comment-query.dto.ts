import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class ICallbackGetSetAgentCommentQueryDto extends zodCreateQueryDto({
    comment: zStr,
}) {}
