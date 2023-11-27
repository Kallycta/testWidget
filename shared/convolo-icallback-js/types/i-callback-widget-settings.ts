import { zICallbackWidgetDesignSettings } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsTypes';
import { zLangIso2, zLcCallOrder } from '@shared/convolo-icallback-js/dto/voximplantTypes';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { zICallbackCallgroupId } from '@shared/convolo-icallback-js/brands/ICallbackCallgroupId';
import { zICallbackWidgetApiKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetApiKey';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { z } from 'zod';
import { zScheduleType } from '@shared/convolo-core/common/schedule.model';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';
import { zValidRegExpString } from '@shared/convolo-core/common/valid-reg-exp-string';
import { zArr, zBool, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackProviderRule } from '@shared/convolo-icallback-js/types/i-callback-provider-rule';

export enum ApiType {
    LEADBACK_FORM_PAYLOAD = 'LEADBACK_FORM_PAYLOAD',
    LEADBACK_JSON = 'LEADBACK_JSON',
    LEADCM_JSON = 'LEADCM_JSON',
}

export const zICallbackWidgetSettings = z.object({
    design: zICallbackWidgetDesignSettings,
    url: z.string(),
    companyName: z.string().optional(),
    call_order: zLcCallOrder,
    number_seconds_call_the_first_line: zSeconds.optional(),
    number_seconds_call_the_next_line: zSeconds.optional(),
    number_seconds_call_the_last_line: zSeconds.optional(),
    repeat_calling_until_the_agent_answers: z.boolean().optional(),
    greetings_language: zLangIso2.optional(),
    greetings_to_lead_language: zLangIso2.optional(),
    timezone: zTimezoneString,
    is_press_key_needed: z.boolean(),
    operators_order: z.array(zAgentId).optional(),
    start_cooldown_ms: z.number(),
    collect_numbers_outside_opening_hours: z.boolean(),
    working_hours: zScheduleType,
    activeGroupsIds: z.array(zICallbackCallgroupId).optional(),
    nwt_department: z.boolean().optional(),
    client_earliest_hour: z.number().optional(),
    use_app_to_process_lead: z.boolean().optional(),
    use_new_pbx: z.boolean().optional(),
    app_call_type: z.enum(['call', 'callback', 'callthrough']).optional(),
    app_tags: zObj({
        positive: zArr(zStr),
        negative: zArr(zStr),
        neutral: zArr(zStr),
    }).optional(),
    future_call_time_interval: z.number().optional(),

    show_popup_always: z.boolean().optional(),

    // SMS
    send_sms_after_calls: z.boolean().optional(),
    success_call_operator_sms: z.string().optional(),
    success_call_operator_sms_numbers: z.string().optional(),
    fail_call_operator_sms: z.string().optional(),
    fail_call_operator_sms_numbers: z.string().optional(),
    missed_call_operator_sms: z.string().optional(),
    missed_call_operator_sms_numbers: z.string().optional(),
    missed_call_operator_sms_send_to_first: z.boolean().optional(),
    missed_call_operator_sms_send_to_all: z.boolean().optional(),
    future_call_operator_sms: z.string().optional(),
    future_call_5_min_operator_sms: z.string().optional(),
    future_call_operator_sms_numbers: z.string().optional(),
    on_demand_call_operator_sms: z.string().optional(),
    on_demand_call_future_operator_sms: z.string().optional(),
    on_demand_call_operator_sms_numbers: z.string().optional(),
    on_demand_call_client_sms: z.string().optional(),
    on_demand_call_future_client_sms: z.string().optional(),
    on_demand_future_calls: z.boolean().optional(),
    sms_sender_id: z.string().optional(),

    success_call_client_sms: z.string().optional(),
    fail_call_client_sms: z.string().optional(),
    missed_call_client_sms: z.string().optional(),
    future_call_client_sms: z.string().optional(),
    future_call_ordered_client_sms: z.string().optional(),

    send_sms_after_callback_calls: z.boolean().optional(),
    answered_callback_call_sms_to_agent: z.string().optional(),
    answered_callback_call_sms_to_agent_numbers: z.string().optional(),
    answered_callback_call_sms_to_lead: z.string().optional(),
    missed_callback_call_sms_to_agent: z.string().optional(),
    missed_callback_call_sms_to_agent_numbers: z.string().optional(),
    missed_callback_call_sms_to_lead: z.string().optional(),

    // EMAIL
    email_connected_calls: z.boolean().optional(),
    list_email_connected_calls: z.string().optional(),
    email_unsuccessful_calls: z.boolean().optional(),
    list_email_future_calls: z.string().optional(),
    email_future_calls: z.boolean().optional(),
    email_future_calls_in_5_min: z.boolean().optional(),
    list_email_unsuccessful_calls: z.string().optional(),
    email_missed_calls: z.boolean().optional(),
    list_email_missed_calls: z.string().optional(),
    list_email_on_demand_calls: z.string().optional(),
    email_on_demand_calls: z.boolean().optional(),
    disable_recording_links_in_emails: z.boolean().optional(),

    override_missed_call_email: zBool.optional(),
    override_missed_call_email_title: zStr.optional(),
    override_missed_call_email_body: zStr.optional(),
    override_no_answer_call_email: zBool.optional(),
    override_no_answer_call_email_title: zStr.optional(),
    override_no_answer_call_email_body: zStr.optional(),
    override_answered_call_email: zBool.optional(),
    override_answered_call_email_title: zStr.optional(),
    override_answered_call_email_body: zStr.optional(),
    override_before_future_call_email: zBool.optional(),
    override_before_future_call_email_title: zStr.optional(),
    override_before_future_call_email_body: zStr.optional(),
    override_future_call_booked_email: zBool.optional(),
    override_future_call_booked_email_title: zStr.optional(),
    override_future_call_booked_email_body: zStr.optional(),
    override_on_demand_call_email: zBool.optional(),
    override_on_demand_call_email_title: zStr.optional(),
    override_on_demand_call_email_body: zStr.optional(),

    email_connected_calls_additional_html_mustache: z.string().optional(),
    email_unsuccessful_calls_additional_html_mustache: z.string().optional(),
    email_missed_calls_additional_html_mustache: z.string().optional(),
    email_disable_sendgrid_tracking: z.boolean().optional(),

    // FEEDBACK
    sms_to_answered_operator_for_feedback: z.boolean().optional(),
    sms_to_answered_operator_for_feedback_message: z.string().optional(),
    sms_to_client_for_feedback: z.boolean().optional(),
    sms_to_client_for_feedback_message: z.string().optional(),

    greetings_to_manager: z.string().optional(),
    greetings_to_agent_when_lead_callback: zStr.optional(),
    call_recording_in_stereo_mode: zBool.optional(),
    greetings_to_lead: z.string().optional(),
    say_country_to_manager: z.boolean().optional(),
    which_number_displayed_to_manager: z.string().optional(),
    which_number_displayed_to_lead: z.string().optional(),
    unsuccessful_call_less_than_seconds: zSeconds.optional().nullable(),
    press_any_key_message: z.string().optional(),
    voice_answer_confirmation: z.boolean().optional(),
    voice_answer_confirmation_language: zLangIso2.optional(),
    voice_answer_confirmation_words: z.string().optional(),

    preselected_country: z.string().optional(),
    limit_how_many_calls_ip_per_hour: z.number().optional(),
    apiUrl: z.string().optional(),
    apiKey: zICallbackWidgetApiKey.optional(),
    apiType: z.nativeEnum(ApiType).optional(),
    api_use_global_user_setting: z.boolean().optional(),

    pre_call_webhook: z.boolean().optional(),
    future_call_webhook: z.boolean().optional(),

    webhooks_v2: z.boolean().optional(),
    webhooks_v3: z.boolean().optional(),

    connect_standard_forms: z.boolean().optional(),
    leadback_gtm_events: z.boolean().optional(),
    convolo_gtm_events: z.boolean().optional(),

    records_allowed: z.boolean().optional(),

    use_preload_snippet: z.boolean().optional(),
    preload_snippet: z.string().optional(),

    use_backend_snippet: z.boolean().optional(),
    backend_snippet: z.string().optional(),

    use_preload_backend_snippet: z.boolean().optional(),
    preload_backend_snippet: z.string().optional(),

    use_call_routing_snippet: z.boolean().optional(),
    call_routing_snippet: z.string().optional(),

    use_result_snippet: z.boolean().optional(),
    result_snippet: z.string().optional(),

    snippets: z.array(
        z.object({
            is_active: z.boolean().optional(),
            name: z.string(),
            type: z.enum(['code', 'design']),
            url_pattern: zValidRegExpString,
            code: z.string(),
        }),
    ),
    sessionSubwidgets: z
        .array(
            z.object({
                url_pattern: zValidRegExpString,
                widget_key: zICallbackWidgetKey,
            }),
        )
        .optional(),
    subwidgets: z.array(
        z.object({
            url_pattern: zValidRegExpString,
            widget_key: zICallbackWidgetKey,
        }),
    ),
    whitelistUrls: z.array(
        z.object({
            url_pattern: zValidRegExpString,
        }),
    ),
    blacklistUrls: z.array(
        z.object({
            url_pattern: zValidRegExpString,
        }),
    ),
    blacklistIPs: z.array(
        z.object({
            ip_pattern: zValidRegExpString,
        }),
    ),
    whitelistIPs: z
        .array(
            z.object({
                ip_pattern: zValidRegExpString,
            }),
        )
        .optional(),
    blacklistNumbers: z
        .array(
            z.object({
                number_pattern: zValidRegExpString,
            }),
        )
        .optional(),
    customParams: z
        .array(
            z.object({
                param_name: zICallbackCustomParamKey,
                param_value: z.string(),
                param_description: z.string().optional(),
                param_is_hidden_in_call_list: z.boolean().optional(),
                xls_column_name: z.string().optional(),
            }),
        )
        .optional(),

    get_design_from_widget_key: zICallbackWidgetKey.nullable().optional(),
    get_texts_from_widget_key: zICallbackWidgetKey.nullable().optional(),

    agentProviderRules: zArr(zICallbackProviderRule).optional(),
    leadProviderRules: zArr(zICallbackProviderRule).optional(),
});

export type ICallbackWidgetSettings = z.infer<typeof zICallbackWidgetSettings>;

export const APP_DEFAULT_TAGS: NonNullable<ICallbackWidgetSettings['app_tags']> = {
    positive: ['Scheduled Meeting', 'Interested, Send Info', 'Positive: Other'],
    neutral: ['Client did not answer', 'Answering Machine', 'Asked to call back later'],
    negative: [
        'NI: Too Expensive',
        'NI: No Need',
        'NI: Bad Timing',
        'NI: Not reached after 6 attempts',
        'Negative: Other',
        'Bad Lead',
        'Wrong Number',
    ],
};
