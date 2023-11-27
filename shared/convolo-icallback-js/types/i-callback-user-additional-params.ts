import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { z } from 'zod';
import { zArr, zBool, zLiteral, zNum, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCallStatus } from '@shared/convolo-icallback-js/types/i-callback-call-status';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zICallbackProviderRule } from '@shared/convolo-icallback-js/types/i-callback-provider-rule';

export const zICallbackUserAdditionalParams = z.object({
    autopopuptimerOnceForAccount: z.boolean().optional(),
    defaultCountry: z.string().optional(),
    isPartner: z.boolean().optional(),
    isPartnerExpensesAccess: z.boolean().optional(),
    icallbackJsTestPath: z.string().optional(),
    icallbackJsTestBackend: z.boolean().optional(),
    diagnosticRecordings: z.boolean().optional(),
    callToManagersWithDidlogic: z.boolean().optional(),
    testSubmitUrl: z.string().optional(),
    testBaseUrl: z.string().optional(),
    isWrongNumberForApiAllowed: z.boolean().optional(),
    accessToUsersOfUser: zUserId.optional(),
    mainUserId: zUserId.optional(),
    mainUserAccess: zLiteral('full').optional(),
    delegateAgentId: zAgentId.optional(),
    allowUsingCallLinkManyTimes: z.boolean().optional(),
    partnerUaeSenderId: z.string().optional(),
    partnerCabinetTitle: z.string().optional(),
    accessToCallsOfUser: z.number().optional(),
    accessToBilling: z.boolean().optional(),
    mainUserName: z.string().optional(),
    manager: z.string().optional(),
    isSuperuser: z.boolean().optional(),
    antiSpamMode: z.boolean().optional(),
    antiSpamSameCountryForIPAndNumber: z.boolean().optional(),
    facebookV2: z.boolean().optional(),
    callListV2: z.boolean().optional(),
    apiGlobalUrl: z.string().optional(),
    blockState: z.enum(['notice', 'warning', 'block']).nullable().optional(),
    exportCustomFieldsInXls: z.boolean().optional(),
    exportCallCostInXls: z.boolean().optional(),
    isFutureCallScheduleCommonForAllWidgets: z.boolean().optional(),
    mobileAppData: z
        .object({
            push_token: z.string().nullable(),
            iosPushkitToken: z.string().nullable(),
            lastLoginTS: zTimestampS,
            lastLoginIP: z.string(),
            lastLoginCountry: z.string(),
        })
        .optional(),
    callbackScript31: zBool.optional(),
    phoneNumber: zStr.optional(),
    providerRules: zArr(zICallbackProviderRule).optional(),
    leadProviderRules: zArr(zICallbackProviderRule).optional(),
    note: z.string().optional(),
    refreshToken: z.string().optional(),
    refreshTokenDate: zDateISOString.optional(),
    billingInfolab: zObj({
        calls_limit: zNum.int(),
        calls_total: zNum.int(),
        warning_threshold: zNum.int(),
        period_start: zDateISOString,
        period_end: zDateISOString.nullable(),
        calls_exclude: zArr(zICallbackCallStatus),
        call_duration_limit: zSeconds.nullable(),
        call_credit_limit: zNum.nullable(),
        call_credit_limit_used: zNum.nullable(),
        comment: zStr,
        chargebee_url: zStr,
        channel: zStr,
    }).optional(),
    agentNumberLimit: z.number().optional(),
    addRecordLinkInCallListXLS: zBool.optional(),
});

export type ICallbackUserAdditionalParams = z.infer<typeof zICallbackUserAdditionalParams>;
export type DelegateRights = ICallbackUserAdditionalParams['mainUserAccess'];
