import { zArr, zBool, zObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zAgentId } from '@shared/convolo-core/brands/agent-id';
import { zTimezoneString } from '@shared/convolo-core/common/time-brands/timezone-string';
import { zScheduleType } from '@shared/convolo-core/common/schedule.model';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { zICallbackAgentSettings } from '@shared/convolo-icallback-js/types/i-callback-agent-settings';
import { z } from 'zod';

export const zICallbackAgentDto = zObj({
    id: zAgentId,
    name: zStr,
    phone: zStr,
    email: zStr.nullable(),
    isActive: zBool,
    settings: zObj({
        timezone: zTimezoneString.optional(),
        working_hours: zScheduleType.optional(),
        onboard_sms: zICallbackAgentSettings.shape.onboard_sms,
        onboard_email: zICallbackAgentSettings.shape.onboard_email,
        delegateShowOnlyCallsInProgress:
            zICallbackAgentSettings.shape.delegateShowOnlyCallsInProgress,
        delegateAccessToMissedCallsOfUnassignedLeads:
            zICallbackAgentSettings.shape.delegateAccessToMissedCallsOfUnassignedLeads,
        delegateAccessToCalls: zICallbackAgentSettings.shape.delegateAccessToCalls,
        delegateUser: zICallbackAgentSettings.shape.delegateUser,
    }),
});

export type ICallbackAgentDto = z.infer<typeof zICallbackAgentDto>;

export class ICallbackPostAgentBodyDto extends zodCreateDto(
    zICallbackAgentDto.omit({ id: true }),
) {}

export class ICallbackPostAgentToggleActiveBodyDto extends zodCreateDto({ isActive: zBool }) {}

export class ICallbackPostAgentChangeDelegatesPasswordBodyDto extends zodCreateDto({
    password: zStr.min(3).max(50),
}) {}

export class ICallbackGetAgentsResponseDto extends zodCreateDto(
    {
        agents: zArr(zICallbackAgentDto),
    },
    zIsSuccessResponseDto,
) {}

export class ICallbackGetAgentResponseDto extends zodCreateDto(
    {
        agent: zICallbackAgentDto,
    },
    zIsSuccessResponseDto,
) {}
