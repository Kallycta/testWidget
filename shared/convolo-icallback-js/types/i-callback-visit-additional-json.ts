import { zLcCallGroup, zLcCallOrder } from '@shared/convolo-icallback-js/dto/voximplantTypes';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { z } from 'zod';
import { zICallbackSmsType } from '@shared/convolo-icallback-js/types/i-callback-sms-type';
import { zArrObj, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export const zICallbackVisitAdditionalJson = z.object({
    debug: zObj({
        isCached: z.boolean().optional(),
        customType: z.string().optional(),
    }).optional(),
    additional_settings: zObj({
        is_utm_visit: z.boolean().optional(),
        utm_path: z.string().optional(),
        override_call_group: zLcCallGroup.optional(),
        custom_preload_script: zStr.optional(),
        override_call_group_set_before: z.boolean().optional(),
        // TODO: replace to call order
        override_call_order: zLcCallOrder.optional(),
        override_email: z.string().optional(),
        override_sms: z.string().optional(),
        message: z.string().optional(),
        custom_params: z.record(zICallbackCustomParamKey, z.string()).optional(),
        wrong_number: z.boolean().optional(),
        number_country_eng: z.string().optional(),
        email_additional_html: z.string().optional(),
        no_fc_init_sms: z.boolean().optional(),
        no_fc_5min_sms: z.boolean().optional(),
        original_call_id: zICallbackVisitStringId.optional(),
    }).optional(),
    is_delayed_call: z.boolean().optional(),
    elapsed_microseconds: z.number().optional(),
    ip: z.string().optional(),
    // TODO: country iso2
    ip_country: z.string().optional(),
    time_log: zArrObj({
        event: z.string(),
        time: z.string(),
        block: z.number(),
        total: z.number(),
    }).optional(),
    data: zObj({
        referer: z.string().optional(),
        screenWidth: z.number().optional(),
        screenHeight: z.number().optional(),
        userAgent: z.string().optional(),
        title: z.string().optional(),
    }).optional(),
    sms: zArrObj({
        to: z.string(),
        msg: z.string(),
        type: zICallbackSmsType.optional(),
        error: z.string(),
        answer: z.any(),
        status: z.string().optional(),
        reg_sms: z.string(),
    }).optional(),
    lc_occ_phone: z.string().optional(),
    backendUrl: z.string().optional(),
    backendBody: z.object({ script: z.string(), url: z.string() }).optional(),
    backendError: z.string().optional(),
    backendResult: z.any().optional(),
    backendElapsed: z.any().optional(),

    pre_notification_sent: z.boolean().optional(),
    call_ordered_api_source: z.string().optional(),
});

export type ICallbackVisitAdditionalJson = z.infer<typeof zICallbackVisitAdditionalJson>;
