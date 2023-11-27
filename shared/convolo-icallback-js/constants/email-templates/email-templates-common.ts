import { EMAIL_TEMPLATE_MISSED_CALL } from '@shared/convolo-icallback-js/constants/email-templates/email-template-missed-call';
import { EMAIL_TEMPLATE_ANSWERED_CALL } from '@shared/convolo-icallback-js/constants/email-templates/email-template-answered-call';
import { EMAIL_TEMPLATE_NO_ANSWER_CALL } from '@shared/convolo-icallback-js/constants/email-templates/email-template-no-answer-call';
import { EMAIL_TEMPLATE_FUTURE_CALL_BOOKED } from '@shared/convolo-icallback-js/constants/email-templates/email-template-future-call-booked';
import { EMAIL_TEMPLATE_BEFORE_FUTURE_CALL } from '@shared/convolo-icallback-js/constants/email-templates/email-template-before-future-call';
import { EMAIL_TEMPLATE_CONFIRM_ACCOUNT } from '@shared/convolo-icallback-js/constants/email-templates/email-template-confirm-account';
import { EMAIL_TEMPLATE_RESET_PASSWORD } from '@shared/convolo-icallback-js/constants/email-templates/email-template-reset-password';
import { EMAIL_TEMPLATE_ON_DEMAND_CALL } from '@shared/convolo-icallback-js/constants/email-templates/email-template-on-demand-call';
import { zEnum, ZodInfer } from '@shared/convolo-core/helpers/zod-helpers';

export type EmailTemplateType = { title: string; html: string };

export const zNotificationEmailType = zEnum([
    'missed_call',
    'no_answer_call',
    'answered_call',
    'before_future_call',
    'future_call_booked',
    'on_demand_call',
]);

export type NotificationEmailType = ZodInfer<typeof zNotificationEmailType>;

export type ServiceEmailType = 'confirm_account' | 'reset_password';

export const NOTIFICATION_EMAIL_TEMPLATES: Record<NotificationEmailType, EmailTemplateType> = {
    missed_call: EMAIL_TEMPLATE_MISSED_CALL,
    answered_call: EMAIL_TEMPLATE_ANSWERED_CALL,
    no_answer_call: EMAIL_TEMPLATE_NO_ANSWER_CALL,
    before_future_call: EMAIL_TEMPLATE_BEFORE_FUTURE_CALL,
    future_call_booked: EMAIL_TEMPLATE_FUTURE_CALL_BOOKED,
    on_demand_call: EMAIL_TEMPLATE_ON_DEMAND_CALL,
};

export const SERVICE_EMAIL_TEMPLATES: Record<ServiceEmailType, EmailTemplateType> = {
    confirm_account: EMAIL_TEMPLATE_CONFIRM_ACCOUNT,
    reset_password: EMAIL_TEMPLATE_RESET_PASSWORD,
};
