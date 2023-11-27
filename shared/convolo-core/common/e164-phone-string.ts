import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type E164PhoneString = Brand<string, 'E164PhoneString'>;

export const zE164PhoneString = zOApi(
    z.custom<E164PhoneString>(
        (x) =>
            z
                .string()
                .regex(/^\+[1-9]\d{1,14}$/)
                .safeParse(x).success,
    ),
    {
        description: 'Phone sting in E164 format',
        type: 'string',
        example: '+14155552671',
    },
);
