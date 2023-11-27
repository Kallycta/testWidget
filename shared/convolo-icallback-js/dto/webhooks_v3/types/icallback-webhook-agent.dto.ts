import { z } from 'zod';
import { zICallbackLeadId } from '@shared/convolo-icallback-js/brands/ICallbackLeadId';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';

export const zICallbackWebhookLeadDto = z.object({
    lead_phone: z.string(),
    lead_id: zICallbackLeadId.nullable(),
    time_created_iso_string: zDateISOString,
    source: z.string(),
    site_path: z.string().nullable(),
    referer: z.string().nullable(),
    ip: z.string().nullable(),
    country: z.string().nullable(),
    additional: z.any(),
    custom_params: z.record(zICallbackCustomParamKey, z.string()).nullable(),
});
