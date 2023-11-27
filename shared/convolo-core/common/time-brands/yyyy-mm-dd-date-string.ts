import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type YYYYMMDDDateString = Brand<string, 'YYYYMMDDDateString'>;

export const zYYYYMMDDDateString = zOApi(
    z.custom<YYYYMMDDDateString>(
        (x) =>
            z
                .string()
                .regex(/^\d{4}-\d{2}-\d{2}$/)
                .safeParse(x).success,
    ),
    {
        description: 'date in format YYYY-MM-DD',
        type: 'string',
        example: '2020-02-15',
    },
);
