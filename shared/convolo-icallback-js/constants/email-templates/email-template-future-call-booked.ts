import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_FUTURE_CALL_BOOKED: EmailTemplateType = {
    title: `{{name}}: {{phone}} {{time_future}} (Future call)`,
    html: `
<div>
<div>Hi,</div>

<div>A lead has ordered a future call.</div>

<div>Client phone number: {{client_phone}}<br>
Time when the call was ordered: {{time}}<br>
Time when the call starts: {{time_future}}</div>

<div>Webpage: {{site}}</div>
<div>URL: {{page}}</div>
<div>{{{additional_html}}}</div>

<div><br>
—<br>
Best regards,</div>

<div>Convolo Support</div>

<div>support@convolo.ai<br>
convolo.ai</div>
</div>`,
};
