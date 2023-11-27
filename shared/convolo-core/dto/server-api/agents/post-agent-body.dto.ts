import { UserId } from '../../../brands/user-id';

export class PostAgentBodyDto {
    userId: UserId;
    name: string;
    email: string | null;
    phone: string;
    active: boolean;
}
