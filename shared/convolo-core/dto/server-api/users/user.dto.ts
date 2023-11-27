import { UserId } from '@shared/convolo-core/brands/user-id';
import { DateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';

export class UserDto {
    id: UserId;
    username: string;
    lastLogin: DateISOString | null;
    isSuperuser: boolean;
    firstName: string;
    lastName: string;
    email: string;
    isStaff: boolean;
    isActive: boolean;
    dateJoined: DateISOString;
    partnerId: UserId | null;
    isDelegate: boolean;
}
