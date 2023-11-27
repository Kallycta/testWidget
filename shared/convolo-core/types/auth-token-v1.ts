import { UserId } from '../brands/user-id';

export class AuthTokenV1 {
    exp: number; // TODO: rename to expiredAt
    icbId: UserId; // TODO: rename to userId
    icbMId?: UserId; // TODO: rename to managerId
    ver: string;
}
