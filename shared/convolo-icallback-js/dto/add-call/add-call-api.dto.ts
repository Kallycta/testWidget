import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackWidgetApiKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetApiKey';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import {
    zBool,
    zObj,
    zodCreateDto,
    zodCreateQueryDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';

const zAddCallApiRequestDto = zObj({
    widget_key: zICallbackWidgetKey,
    api_key: zICallbackWidgetApiKey,
    lc_number: zStr,
    lc_number_2: zStr.optional(),
    lc_message: zStr.optional(),
    future_unixstamp: zTimestampS.optional(),
    delay_sec: zSeconds.optional(),
    country: zStr.transform((v) => (v !== 'undefined' ? v : undefined)).optional(),
    on_demand: zBool.optional(),
    no_repeat: zBool.optional(),
    no_fc_init_sms: zBool.optional(),
    no_fc_5min_sms: zBool.optional(),
    api_source: zStr.optional(),
    is_test: zBool.optional(),
}).passthrough();

export type AddCallApiRequestDto = z.infer<typeof zAddCallApiRequestDto>;

export class AddCallApiRequestQueryDto extends zodCreateQueryDto(zAddCallApiRequestDto) {}

export class AddCallApiRequestBodyDto extends zodCreateDto(zAddCallApiRequestDto) {}
