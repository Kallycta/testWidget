import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_MISSED_CALL: EmailTemplateType = {
    title: `{{name}}: {{phone}} (Missed call)`,
    html: `
<div>
<div>Hi,</div>

<div>Convolo just generated a lead for you, but none of your operators took the call.</div>

<div>Client phone number: {{client_phone}}<br>
Time: {{time}}</div>

<div>Webpage: {{site}}</div>

<div>URL: {{page}}</div>
<div>{{{additional_html}}}</div>

<div>Call them&nbsp;as soon as possible not miss out on potential business! :)</div>

<div><br>
—<br>
Best regards,&nbsp;</div>

<div>Convolo&nbsp;Support</div>

<div>support@convolo.ai<br>
convolo.ai</div>
</div>`,
};
