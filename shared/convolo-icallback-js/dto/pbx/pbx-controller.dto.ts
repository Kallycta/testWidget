import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import {
    zBool,
    zodCreateDto,
    zodCreateQueryDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import {
    zLangIso2,
    zLcCallAgent,
    zLcCallProviderShort,
} from '@shared/convolo-icallback-js/dto/voximplantTypes';

export class PbxWidgetGetPbxSettingsRequestQueryDto extends zodCreateQueryDto({
    visit_id: zICallbackVisitStringId.optional(),
    rotation: z.enum(['prod', 'demo']).optional(),
}) {}

export class PbxRecentCallsAgentForNumberRequestQueryDto extends zodCreateQueryDto({
    number: zOApi(z.string().min(5), 'phone number'),
    create_visit: zBool.optional(),
}) {}

export class PbxRecentCallsAgentForNumberResponseDto extends zodCreateDto(
    {
        found: z.boolean(),
        agent: zLcCallAgent.optional(),
        visit_id: zICallbackVisitStringId.optional(),
        greetings_to_agent_language: zLangIso2.optional(),
        greetings_to_agent_when_lead_callback: zStr.optional(),
        call_recording_in_stereo_mode: zBool.optional(),
    },
    zIsSuccessResponseDto,
) {}

export class PbxCallThroughPhoneByCodeQueryDto extends zodCreateQueryDto({
    code: zOApi(z.string().min(4), 'access code', '1234'),
}) {}

export class PbxCallThroughPhoneByCodeResponseDto extends zodCreateDto(
    {
        phone: z.string().optional(),
        agentName: z.string().optional(),
        provider: zLcCallProviderShort.optional(),
        callId: zICallbackVisitStringId.optional(),
        callRecordingInStereoMode: z.boolean().optional(),
    },
    zIsSuccessResponseDto,
) {}

export class PbxCheckProviderResponseDto extends zodCreateDto(
    {
        provider: zLcCallProviderShort,
    },
    zIsSuccessResponseDto,
) {}

export class PbxIsOperatorNumberRequestQueryDto extends zodCreateQueryDto({
    number: zOApi(z.string().min(5), 'phone number'),
}) {}

export class PbxIsOperatorNumberResponseDto extends zodCreateDto(
    {
        found: z.boolean(),
    },
    zIsSuccessResponseDto,
) {}

export class PbxActiveCallForTheLineRequestQueryDto extends zodCreateQueryDto({
    clientPhone: zOApi(z.string().min(5), 'client phone'),
    lineNumber: zOApi(z.string().min(5), 'line phone number'),
}) {}

export class PbxActiveCallForTheLineResponseDto extends zodCreateDto(
    {
        found: z.boolean().optional(),
        clientPhone: z.string().optional(),
    },
    zIsSuccessResponseDto,
) {}
