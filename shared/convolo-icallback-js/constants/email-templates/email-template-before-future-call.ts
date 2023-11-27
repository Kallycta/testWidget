import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_BEFORE_FUTURE_CALL: EmailTemplateType = {
    title: `{{name}}: {{time_future}}  (Future call in 5 minutes)`,
    html: `
<div>
<div>Hi,</div>

<div>In 5 minutes you will get a call ordered before.</div>

<div>Client phone number: <span class="js-phone-number">{{client_phone}}</span><br>
Time when the call was ordered: {{time}}<br>
Time when the call starts: {{time_future}}</div>

<div>Webpage: {{site}}</div>
<div>URL: {{page}}</div>
<div>{{{additional_html}}}</div>

<div><br>
—<br>
Best regards,&nbsp;</div>

<div>Convolo&nbsp;Support</div>

<div><a href="mailto:support@convolo.ai">support@convolo.ai</a><br>
<a href="https://www.convolo.ai" target="_blank">www.convolo.ai</a></div>
</div>`,
};
