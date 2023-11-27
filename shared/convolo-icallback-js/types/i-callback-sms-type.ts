import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';
import { ZodInfer } from '@shared/convolo-core/helpers/zod-helpers';

export const zICallbackSmsType = zOApi(
    z.enum([
        'future_call_client_sms',
        'future_call_ordered_client_sms',
        'on_demand_call_future_client_sms',
        'on_demand_call_client_sms',
        'missed_call_operator_sms',
        'missed_call_client_sms',
        'fail_call_operator_sms',
        'fail_call_client_sms',
        'success_call_operator_sms',
        'success_call_client_sms',
        'future_call_5_min_operator_sms',
        'future_call_operator_sms',
        'on_demand_call_future_operator_sms',
        'on_demand_call_operator_sms',
        'success_lead_callback_agent_sms',
        'success_lead_callback_to_other_agents_sms',
        'success_lead_callback_lead_sms',
        'missed_lead_callback_agent_sms',
        'missed_lead_callback_to_other_agents_sms',
        'missed_lead_callback_lead_sms',
    ]),
    'Convolo leads sms type',
);

export type ICallbackSmsType = ZodInfer<typeof zICallbackSmsType>;
