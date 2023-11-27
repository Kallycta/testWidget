import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_ANSWERED_CALL: EmailTemplateType = {
    title: `Successful call from {{name}}! Talk time: {{duration}}. See more info in the email.`,
    html: `
<div>Hi!<br>
Convolo just generated a new lead for you and connected the call with:</div>

<div>{{operator_name}} ({{operator_phone}})</div>

<div>Lead call information:</div>

<div>Client phone number: {{client_phone}}</div>

<div>Website: {{site}}</div>

<div>URL: {{page}}</div>
<div>{{{additional_html}}}</div>

{{#record_link}}
<div>Call recording:  
    <a href='{{record_link}}'>Click here to listen to the call recording.</a> 
    (<a href='{{record_link}}'>{{record_link}}</a>)
</div>
{{/record_link}}

<div>&nbsp;</div>
<div><br>
—<br>
Best regards,</div>

<div>Convolo Support</div>

<div>support@convolo.ai<br>
convolo.ai</div>`,
};
