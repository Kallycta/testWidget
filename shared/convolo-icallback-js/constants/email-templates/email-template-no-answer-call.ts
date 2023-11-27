import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_NO_ANSWER_CALL: EmailTemplateType = {
    title: `Unsuccessful call from {{name}}! See more info in the email.`,
    html: `
<div>
<div>Hi!</div>

<div>You called the client, but the client did not pickup the phone.</div>

<div>Phone number: {{client_phone}}<br>
Time: {{time}}</div>

<div>URL: {{page}}</div>
<div>{{{additional_html}}}</div>

<div>Try calling them again a bit later, to not miss out on potential new business :) </div>

<div><br>
—<br>
Best regards,</div>

<div>Convolo Support</div>

<div>support@convolo.ai<br>
convolo.ai</div>
</div>`,
};
