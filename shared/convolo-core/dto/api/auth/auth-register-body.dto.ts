export class AuthRegisterBodyDto {
    email: string;
    password: string;
    confirm_password: string;
    terms: boolean;
    promo_code: string;
}
