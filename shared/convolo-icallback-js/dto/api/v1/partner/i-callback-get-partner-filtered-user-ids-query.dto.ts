import { zodCreateQueryDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class ICallbackGetPartnerFilteredUserIdsQueryDto extends zodCreateQueryDto({
    searchString: zStr,
}) {}
