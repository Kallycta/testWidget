import { zBool, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zICallbackUserAdditionalParams } from '@shared/convolo-icallback-js/types/i-callback-user-additional-params';

export class AuthUpdateSettingsRequestBodyDto extends zodCreateDto({
    diagnosticRecordings: zBool.optional(),
    facebookV2: zBool.optional(),
    callListV2: zBool.optional(),
    antiSpamMode: zBool.optional(),
    antiSpamSameCountryForIPAndNumber: zBool.optional(),
    callToManagersWithDidlogic: zBool.optional(),
    defaultCountry: z
        .string()
        .regex(/^[A-Z]{2}$/)
        .optional(),
    isWrongNumberForApiAllowed: zBool.optional(),
    allowUsingCallLinkManyTimes: zBool.optional(),
    icallbackJsTestPath: z.string().optional(),
    partnerUaeSenderId: z
        .enum(['bfound', 'NWMEA', 'Convolo AI', 'SectorAlarm', 'Deyaar', ''])
        .optional(),
    partnerCabinetTitle: z.string().optional(),
    blockState: z.enum(['notice', 'warning', 'block']).nullable().optional(),
    autopopuptimerOnceForAccount: zBool.optional(),
    isFutureCallScheduleCommonForAllWidgets: zBool.optional(),
    exportCustomFieldsInXls: zBool.optional(),
    exportCallCostInXls: zBool.optional(),
    apiGlobalUrl: z.string().optional(),
    callbackScript31: zBool.optional(),
    providerRules: zICallbackUserAdditionalParams.shape.providerRules,
    leadProviderRules: zICallbackUserAdditionalParams.shape.leadProviderRules,
    agentNumberLimit: z.number().optional(),
    addRecordLinkInCallListXLS: zBool.optional(),
    futureCallTimeInterval: z.number().optional(),
}) {}
