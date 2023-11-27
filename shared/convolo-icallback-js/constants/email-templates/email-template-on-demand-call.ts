import { EmailTemplateType } from '@shared/convolo-icallback-js/constants/email-templates/email-templates-common';

export const EMAIL_TEMPLATE_ON_DEMAND_CALL: EmailTemplateType = {
    title: `New Lead from Convolo 🎉`,
    html: `
<div>
<div>Hi!</div>

<div>A potential client has left the details at {{time}}. 
As soon as you are available, please get in touch with the 
client by clicking the following link: <a href='{{callLink}}'>{{callLink}}</a>.
</div>

<div><br>
—<br>
Best regards,</div>

<div>Convolo Support</div>

<div>support@convolo.ai<br>
convolo.ai</div>
</div>`,
};
