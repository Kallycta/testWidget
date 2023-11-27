import { z } from 'zod';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type DateISOString = Brand<string, 'DateISOString'>;
export const zDateISOString = zOApi(
    z.custom<DateISOString>(
        (x) =>
            z
                .string()
                .regex(
                    /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
                )
                .safeParse(x).success,
    ),
    {
        description: 'ISO 8601 date string',
        type: 'string',
        example: '2020-01-01T12:00:00.000Z',
    },
);
