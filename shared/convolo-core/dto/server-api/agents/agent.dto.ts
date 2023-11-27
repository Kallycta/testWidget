import { UserId } from '../../../brands/user-id';
import { AgentId } from '../../../brands/agent-id';
import { EmailString } from '@shared/convolo-core/common/email-string';
import { E164PhoneString } from '@shared/convolo-core/common/e164-phone-string';

export class AgentDto {
    id: AgentId;
    userId: UserId;
    name: string;
    email: EmailString | null;
    phone: E164PhoneString;
    active: boolean;
}
