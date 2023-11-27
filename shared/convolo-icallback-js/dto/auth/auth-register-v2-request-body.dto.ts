import { zBool, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';

export class AuthRegisterV2RequestBodyDto extends zodCreateDto({
    email: zStr.email(),
    password: zStr.min(3).max(50),
    confirm_password: zStr.min(3).max(50),
    phone_number: zStr.optional(),
    promo_code: zStr,
    terms: zBool,
}) {}
