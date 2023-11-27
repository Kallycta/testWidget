import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zTimestampMs } from '@shared/convolo-core/common/time-brands/timestamp-ms';
import {
    zBool,
    zObj,
    zodCreateDto,
    zodCreateQueryDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export const zAddCallRequestDto = zObj({
    widget_key: zICallbackWidgetKey,
    visit_id: zICallbackVisitStringId,
    phone: zStr,
    country: zStr.transform((v) => (v !== 'undefined' ? v : undefined)).optional(),
    department_key: zICallbackWidgetKey.optional(),
    nwt: zBool,
    futureMs: zTimestampMs.optional(),
});

export type AddCallRequestDto = z.infer<typeof zAddCallRequestDto>;

export class AddCallRequestBodyDto extends zodCreateDto(zAddCallRequestDto) {}

export class AddCallRequestQueryDto extends zodCreateQueryDto(zAddCallRequestDto) {}
