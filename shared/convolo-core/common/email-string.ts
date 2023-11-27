import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type EmailString = Brand<string, 'EmailString'>;

export const zEmailString = zOApi(
    z.custom<EmailString>((x) => z.string().email().safeParse(x).success),
    {
        description: 'Email',
        type: 'string',
        example: 'mymail@example.com',
    },
);
