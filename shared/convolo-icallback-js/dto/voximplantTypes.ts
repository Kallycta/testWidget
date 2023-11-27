import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { zICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';
import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { z } from 'zod';
import {
    zArr,
    zArrObj,
    zBool,
    zNum,
    zObj,
    zodCreateDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';

export const zLangIso2 = z.enum([
    'EN',
    'SE',
    'NO',
    'FI',
    'DK',
    'AR',
    'ES',
    'DE',
    'NL',
    'FR',
    'GR',
    'JP',
    'KO',
]);
export type LangIso2 = z.infer<typeof zLangIso2>;

export const zLcCallOrder = z.enum([
    'same_time',
    'even',
    'even_then_others',
    'first_then_others',
    'ordered',
    'ordered_groups',
    'ordered_random',
    // TODO: is this type used ?
    // 'ordered_random_until_answer',
    'rotation_then_others',
    'rotation_then_all_others',
    'rotate_full_group',
    'rotate_first_group_then_ordered',
    'rotate_groups',

    'first_than_others',
    'even_than_others',
    'rotation_than_others',
    'rotation_than_all_others',
]);
export type LcCallOrder = z.infer<typeof zLcCallOrder>;

export const zLcCallAgentExtended = zObj({
    id: zAgentId,
    phone: zStr,
    name: zStr.optional(),
    email: zStr.optional(),
    custom_nwt: zBool.optional(),
    is_not_active: zBool.optional(),
});

// TODO: named tuples ?
export const zLcCallProviderShort = z.tuple([
    zStr, // country
    zArr(
        z.tuple([
            zStr, // provider
            zStr, // callerId
        ]),
    ),
]);

export type LcCallProviderShort = z.infer<typeof zLcCallProviderShort>;

export const zLcCallProvider = zObj({
    country: zStr,
    providers: zArrObj({
        provider: zStr, // provider
        callerId: zStr, // callerId
    }),
});

export type LcCallProvider = z.infer<typeof zLcCallProvider>;

export const zLcCallAgent = zObj({
    id: zAgentId,
    phone: zStr,
    name: zStr.optional(),
    email: zStr.optional(),
    provider: zLcCallProvider.optional(),
});

export const zLcCallAgentShort = z.tuple([
    zAgentId, // id
    zStr, // phone
    zNum, // provider index
    zStr.optional(), // name
    zStr.optional(), // email
]);

export const lcCallProviderShortToFull = (provider: LcCallProviderShort): LcCallProvider => ({
    country: provider[0],
    providers: provider[1].map((p) => ({
        provider: p[0],
        callerId: p[1],
    })),
});

export const lcCallProviderFullToShort = (provider: LcCallProvider): LcCallProviderShort => [
    provider.country,
    provider.providers.map((p) => [p.provider, p.callerId]),
];

export type LcCallAgent = z.infer<typeof zLcCallAgent>;
export type LcCallAgentShort = z.infer<typeof zLcCallAgentShort>;
export type LcCallAgentExtended = z.infer<typeof zLcCallAgentExtended>;

export const zLcCallGroup = z.array(zLcCallAgent);
export type LcCallGroup = z.infer<typeof zLcCallGroup>;

export const zLcCallGroupExtended = z.array(zLcCallAgentExtended);
export type LcCallGroupExtended = z.infer<typeof zLcCallGroupExtended>;

export const zLcCallGroups = z.array(zLcCallGroup);
export type LcCallGroups = z.infer<typeof zLcCallGroups>;

export const zLcTestCallCustomData = zObj({
    agent: zLcCallAgent,
    user_id: zUserId,
});

export type LcTestCallCustomData = z.infer<typeof zLcTestCallCustomData>;

export const zLcPbxSettings = zObj({
    resultCallGroups: z.array(z.array(zLcCallAgentShort).nonempty()),
    indexes: zArr(zNum),
    providers: zArr(zLcCallProviderShort),
    which_number_displayed_to_manager: zStr.nullable(),
    which_number_displayed_to_lead: zStr.nullable(),
    is_press_key_needed: zBool,
    greetings_to_manager: zStr.nullable(),
    greetings_to_agent_when_lead_callback: zStr.nullable(),
    call_recording_in_stereo_mode: zBool,
    greetings_language: zLangIso2,
    greetings_to_lead: zStr,
    press_any_key_message: zStr,
    greetings_to_lead_language: zLangIso2,
    say_country_to_manager: zBool,
    number_seconds_call_the_first_line: z.number(),
    number_seconds_call_the_next_line: z.number(),
    number_seconds_call_the_last_line: z.number().optional(),
    repeat_calling_until_the_agent_answers: zBool,
    diagnosticRecordings: zBool,
    callToManagersWithDidlogic: zBool,
    voice_answer_confirmation: zBool,
    voice_answer_confirmation_language: zLangIso2,
    voice_answer_confirmation_words: zStr,
    messages: zObj({
        you_start_calling_to_the_client: zStr,
        another_person_took_the_call: zStr,
        unavailable_message: zStr,
    }),
    debug: z.any(),
});

export class LcPbxSettings extends zodCreateDto(zLcPbxSettings) {}

export const zLcCustomData = zObj({
    leadPhone: zStr.nonempty(),
    leadProvider: zLcCallProviderShort,
    widget_key: zICallbackWidgetKey,
    visit_id: zICallbackVisitStringId,
    user_id: zUserId,
    user_name: zStr,
    test_mode: zBool,
    baseUrl: zStr,
    additional_settings: zObj({
        override_call_group: zLcCallGroup.optional(),
        override_call_group_set_before: zBool.optional(),
        message: zStr.optional(),
        is_delayed_call: zBool.optional(),
        override_call_order: zLcCallOrder.optional(),
        number_country_eng: zStr.optional(),
        wrong_number: zBool.optional(),
        relativeHourForDelayedCallMessage: zStr.optional(),
        custom_params: z
            .object({
                lc_number_2: zStr.optional(),
            })
            .optional(),
    }),
    settings: zLcPbxSettings,
});

export type LcCustomData = z.infer<typeof zLcCustomData>;
