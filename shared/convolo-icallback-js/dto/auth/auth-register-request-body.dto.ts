import { zBool, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class AuthRegisterRequestBodyDto extends zodCreateDto({
    email: zStr.email(),
    password: zStr.min(3).max(50),
    confirmPassword: zStr.min(3).max(50),
    fullName: zStr,
    terms: zBool,
}) {}
